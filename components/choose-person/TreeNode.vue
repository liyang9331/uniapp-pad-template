<template>
  <div>
    <!-- 节点显示 -->
    <div class="node" @click="toggle">
      <div class="node-left">
        <div class="drop">
          <template v-if="hasChildren">
            <u-icon v-if="isExpanded" name="arrow-down"></u-icon>
            <u-icon v-else name="arrow-right"></u-icon>
          </template>
        </div>
        <span>{{ node.label }}</span>
      </div>
      <checkbox v-if="node.type != 'department'" type="checkbox" :checked="isSelected" @change="toggleSelection" />
    </div>

    <!-- 子节点 -->
    <div v-if="hasChildren && isExpanded" class="children">
      <TreeNode v-for="child in node.children" :key="child.value" :node="child" :selectedValues="selectedValues"
        @update:selectedValues="updateSelectedValues" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true,
    },
    selectedValues: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false, // 节点是否展开
    };
  },
  computed: {
    hasChildren() {
      return this.node.children && this.node.children.length > 0;
    },
    isSelected() {
      return this.selectedValues.includes(this.node.value);
    },
  },
  methods: {
    // 切换展开状态
    toggle() {
      if (this.node.type == 'department') {
        this.isExpanded = !this.isExpanded;
      } else {
        this.toggleSelection(); // 仅叶子节点可以选择
      }
    },
    // 处理选中或取消选中
    toggleSelection() {
      const newValues = [...this.selectedValues];
      const index = newValues.indexOf(this.node.value);

      if (index === -1) {
        newValues.push(this.node.value);
      } else {
        newValues.splice(index, 1);
      }

      this.$emit('update:selectedValues', newValues);
    },
    // 更新子节点选中值
    updateSelectedValues(newValues) {
      this.$emit('update:selectedValues', newValues);
    },
  },
};
</script>

<style scoped>
.node {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  font-size: 11rpx;
}

.node-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.drop {
  width: 20rpx;
  height: 20rpx;
  display: flex;
  align-items: center;
}

.children {
  margin-left: 20px;
}
</style>
