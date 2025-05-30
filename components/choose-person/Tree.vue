<template>
	<div>
		<TreeNode v-for="node in options" :key="node.value" :node="node" :selectedValues="selectedValues"
			@update:selectedValues="updateSelectedValues" />
	</div>
</template>

<script>
	import TreeNode from './TreeNode.vue';

	export default {
		components: {
			TreeNode,
		},
		props: {
			options: {
				type: Array,
				required: true,
			},
			value: {
				type: Array,
				default: () => [],
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal, oldVal) {
					this.selectedValues = newVal
				},
			},
		},
		data() {
			return {
				selectedValues: [],
			};
		},

		methods: {
			updateSelectedValues(newValues) {
				this.$emit('input', newValues);
				this.$emit('change', newValues);
			},
		},
	};
</script>