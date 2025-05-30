import Node from './node';
import {
	getNodeKey,
	getPropertyFromData
} from '../tool/util';

export default class TreeStore {
	constructor(options) {
		this.ready = false;
		this.currentNode = null;
		this.currentNodeKey = null;
		Object.assign(this, options);
		if (!this.key) {
			throw new Error('[Tree] nodeKey is required');
		}

		this.nodesMap = {};
		this.root = new Node({
			data: this.data,
			store: this
		});
		// 指定了叶子节点懒加载，传递了load函数
		if (this.lazy && this.load) {
			const loadFn = this.load;
			loadFn(this.root, (data) => {
				this.root.doCreateChildren(data);
				this._initDefaultCheckedNodes();
				this.ready = true;
			});
		} else {
			this._initDefaultCheckedNodes();
			this.ready = true;
		}
	}

	filter(value, data) {
		const filterNodeMethod = this.filterNodeMethod;
		const lazy = this.lazy;
		const _self = this;
		const traverse = function(node) {
			const childNodes = node.root ? node.root.getChildNodes(node.root.childNodesId) : node.getChildNodes(node.childNodesId);

			childNodes.forEach((child) => {
				if (data && typeof data === 'object') {
					let nodePath = _self.getNodePath(child.data);
					if (!nodePath.some(pathItem => pathItem[_self.key] === data[_self.key])) {
						child.visible = false;
						traverse(child);
						return;
					}
				}
				
				if (_self.childVisibleForFilterNode) {
					let parent = child.getParent(child.parentId);
					child.visible = filterNodeMethod.call(child, value, child.data, child) || (parent && parent.visible);
				} else {
					child.visible = filterNodeMethod.call(child, value, child.data, child);
				}
				
				traverse(child);
			});

			if (!node.visible && childNodes.length) {
				let allHidden = true;
				allHidden = !childNodes.some(child => child.visible);

				if (node.root) {
					node.root.visible = allHidden === false;
				} else {
					node.visible = allHidden === false;
				}
			}
			
			if (!value) return;

			if (node.visible && !node.isLeaf && !lazy) node.expand();
		};

		traverse(this);
	}

	setData(newVal) {
		const instanceChanged = newVal !== this.root.data;
		if (instanceChanged) {
			this.root.setData(newVal);
			this._initDefaultCheckedNodes();
		} else {
			this.root.updateChildren();
		}
	}

	getNode(data) {
		if (data instanceof Node) return data;
		const key = typeof data !== 'object' ? data : getNodeKey(this.key, data);
		if (!key) return null;
		return this.nodesMap[key] || null;
	}

	insertBefore(data, refData) {
		const refNode = this.getNode(refData);
		let parent = refNode.getParent(refNode.parentId);
		parent.insertBefore({
			data
		}, refNode);
	}

	insertAfter(data, refData) {
		const refNode = this.getNode(refData);
		let parent = refNode.getParent(refNode.parentId);
		parent.insertAfter({
			data
		}, refNode);
	}

	remove(data) {
		const node = this.getNode(data);

		if (node && node.parentId !== null) {
			let parent = node.getParent(node.parentId);
			if (node === this.currentNode) {
				this.currentNode = null;
			}
			parent.removeChild(node);
		}
	}

	append(data, parentData) {
		const parentNode = parentData ? this.getNode(parentData) : this.root;

		if (parentNode) {
			parentNode.insertChild({
				data
			});
		}
	}

	_initDefaultCheckedNodes() {
		const defaultCheckedKeys = this.defaultCheckedKeys || [];
		const nodesMap = this.nodesMap;
		let checkedKeyfromData = [];
		let totalCheckedKeys = []
		
		for (let key in nodesMap) {
			let checked = getPropertyFromData(nodesMap[key], 'checked') || false;
			checked && checkedKeyfromData.push(key);
		}
		
		totalCheckedKeys = Array.from(new Set([...defaultCheckedKeys, ...checkedKeyfromData]));
		totalCheckedKeys.forEach((checkedKey) => {
			const node = nodesMap[checkedKey];
			
			if (node) {
				node.setChecked(true, !this.checkStrictly);
			}
		});
	}

	_initDefaultCheckedNode(node) {
		const defaultCheckedKeys = this.defaultCheckedKeys || [];

		if (defaultCheckedKeys.indexOf(node.key) !== -1) {
			node.setChecked(true, !this.checkStrictly);
		}
	}
	
	toggleExpendAll(isExpandAll) {
		const allNodes = this._getAllNodes();
		
		allNodes.forEach(item => {
			const node = this.getNode(item.key); 
			
			if (node) isExpandAll ? node.expand() : node.collapse();
		});
	}
	
	setCheckAll(isCkeckAll) {
		const allNodes = this._getAllNodes();
		
		allNodes.forEach(item => {
			item.setChecked(isCkeckAll, false);
		}); 
	}

	setDefaultCheckedKey(newVal) {
		if (newVal !== this.defaultCheckedKeys) {
			this.defaultCheckedKeys = newVal;
			this._initDefaultCheckedNodes();
		}
	}

	registerNode(node) {

		const key = this.key;
		if (!key || !node || !node.data) return;

		const nodeKey = node.key;
		if (nodeKey !== undefined) this.nodesMap[node.key] = node;
	}

	deregisterNode(node) {
		const key = this.key;
		if (!key || !node || !node.data) return;

		let childNodes = node.getChildNodes(node.childNodesId);
		childNodes.forEach(child => {
			this.deregisterNode(child);
		});

		delete this.nodesMap[node.key];
	}
	
	getNodePath(data) {
		if (!this.key) throw new Error('[Tree] nodeKey is required in getNodePath');
		const node = this.getNode(data);
		if (!node) return [];
		
		const path = [node.data];
		let parent = node.getParent(node.parentId);
		while (parent && parent !== this.root) {
			path.push(parent.data);
			parent = parent.getParent(parent.parentId);
		}
		return path.reverse();
	}

	getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
		const checkedNodes = [];
		const traverse = function(node) {
			const childNodes = node.root ? node.root.getChildNodes(node.root.childNodesId) : node.getChildNodes(node.childNodesId);

			childNodes.forEach((child) => {
				if ((child.checked || (includeHalfChecked && child.indeterminate)) && (!leafOnly || (leafOnly && child.isLeaf))) {
					checkedNodes.push(child.data);
				}

				traverse(child);
			});
		};

		traverse(this);

		return checkedNodes;
	}

	getCheckedKeys(leafOnly = false, includeHalfChecked = false) {
		return this.getCheckedNodes(leafOnly, includeHalfChecked).map((data) => (data || {})[this.key]);
	}

	getHalfCheckedNodes() {
		const nodes = [];
		const traverse = function(node) {
			const childNodes = node.root ? node.root.getChildNodes(node.root.childNodesId) : node.getChildNodes(node.childNodesId);

			childNodes.forEach((child) => {
				if (child.indeterminate) {
					nodes.push(child.data);
				}

				traverse(child);
			});
		};

		traverse(this);

		return nodes;
	}

	getHalfCheckedKeys() {
		return this.getHalfCheckedNodes().map((data) => (data || {})[this.key]);
	}

	_getAllNodes() {
		const allNodes = [];
		const nodesMap = this.nodesMap;
		for (let nodeKey in nodesMap) {
			if (nodesMap.hasOwnProperty(nodeKey)) {
				allNodes.push(nodesMap[nodeKey]);
			}
		}

		return allNodes;
	}

	updateChildren(key, data) {
		const node = this.nodesMap[key];
		if (!node) return;
		const childNodes = node.getChildNodes(node.childNodesId);
		for (let i = childNodes.length - 1; i >= 0; i--) {
			const child = childNodes[i];
			this.remove(child.data);
		}
		for (let i = 0, j = data.length; i < j; i++) {
			const child = data[i];
			this.append(child, node.data);
		}
	}

	_setCheckedKeys(key, leafOnly = false, checkedKeys) {
		const allNodes = this._getAllNodes().sort((a, b) => b.level - a.level);
		const cache = Object.create(null);
		const keys = Object.keys(checkedKeys);
		allNodes.forEach(node => node.setChecked(false, false));
		for (let i = 0, j = allNodes.length; i < j; i++) {
			const node = allNodes[i];
			let nodeKey = node.data[key];
			
			if (typeof nodeKey === 'undefined') continue;
			
			nodeKey = nodeKey.toString();
			let checked = keys.indexOf(nodeKey) > -1;
			if (!checked) {
				if (node.checked && !cache[nodeKey]) {
					node.setChecked(false, false);
				}
				continue;
			}

			let parent = node.getParent(node.parentId);
			while (parent && parent.level > 0) {
				cache[parent.data[key]] = true;
				parent = parent.getParent(parent.parentId);
			}

			if (node.isLeaf || this.checkStrictly) {
				node.setChecked(true, false);
				continue;
			}
			node.setChecked(true, true);

			if (leafOnly) {
				node.setChecked(false, false);
				const traverse = function(node) {
					const childNodes = node.getChildNodes(node.childNodesId);
					childNodes.forEach((child) => {
						if (!child.isLeaf) {
							child.setChecked(false, false);
						}
						traverse(child);
					});
				};
				traverse(node);
			}
		}
	}

	setCheckedNodes(array, leafOnly = false) {
		const key = this.key;
		const checkedKeys = {};
		array.forEach((item) => {
			checkedKeys[(item || {})[key]] = true;
		});

		this._setCheckedKeys(key, leafOnly, checkedKeys);
	}

	setCheckedKeys(keys, leafOnly = false) {
		this.defaultCheckedKeys = keys;
		const key = this.key;
		const checkedKeys = {};
		keys.forEach((key) => {
			checkedKeys[key] = true;
		});

		this._setCheckedKeys(key, leafOnly, checkedKeys);
	}

	setDefaultExpandedKeys(keys) {
		keys = keys || [];
		this.defaultExpandedKeys = keys;

		keys.forEach((key) => {
			const node = this.getNode(key);
			if (node) node.expand(null, this.autoExpandParent);
		});
	}

	setChecked(data, checked, deep) {
		const node = this.getNode(data);

		if (node) {
			node.setChecked(!!checked, deep);
		}
	}

	getCurrentNode() {
		return this.currentNode;
	}

	setCurrentNode(currentNode) {
		const prevCurrentNode = this.currentNode;
		if (prevCurrentNode) {
			prevCurrentNode.isCurrent = false;
		}
		this.currentNode = currentNode;
		this.currentNode.isCurrent = true;
		
		this.expandCurrentNodeParent && this.currentNode.expand(null, true)
	}

	setUserCurrentNode(node) {
		const key = node[this.key];
		const currNode = this.nodesMap[key];
		this.setCurrentNode(currNode);
	}

	setCurrentNodeKey(key) {
		if (key === null || key === undefined) {
			this.currentNode && (this.currentNode.isCurrent = false);
			this.currentNode = null;
			return;
		}
		const node = this.getNode(key);
		if (node) {
			this.setCurrentNode(node);
		}
	}
};
