<template>
	<view class="tabs">
		<view class="items">
			<view class="item" :id="'item'+index" v-for="(item,index) in list" :class="active==item.name?'active':''"
				@tap="handleChange(item,index)">
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="underline"></view>
		<!-- 滑块 -->
		<view class="slider" :style="{'left':left==0?'8.2rpx':left+'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: "tabs",
		props: {
			list: {
				type: Array,
				default: [],
			}
		},
		data() {
			return {
				active: "",
				index: 0,
				left:0
			}
		},
		created() {
			this.active = this.list[0].name
		},
		methods: {
			// 方法：计算指定index元素左侧总宽度
			async calculateLeftOffset(index) {
			  if (index <= 0) {
			    this.left = 0;
			    return;
			  }
			
			  // 1. 创建批量查询
			  const query = uni.createSelectorQuery();
			  const promises = [];
			
			  // 2. 收集所有前序元素的测量请求
			  for (let i = 0; i < index; i++) {
			    promises.push(new Promise(resolve => {
			      query.select('#item' + i)
			        .boundingClientRect(resolve)
			        .exec();
			    }));
			  }
			
			  // 3. 执行所有查询并计算
			  try {
			    const results = await Promise.all(promises);
			    const totalWidth = results.reduce((sum, res) => {
			      return sum + (res?.width || 0);
			    }, 0);
			    
			    this.left = totalWidth+uni.upx2px(8.25);
			    console.log('左侧总宽度:', totalWidth);
			  } catch (e) {
			    console.error('计算失败:', e);
			    this.left = 0;
			  }
			},
			handleChange(item, index) {
				this.calculateLeftOffset(index)
				this.active = item.name
				this.$emit("change",item)
				this.index = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		position: relative;
		padding-bottom: 7.03rpx;
		// padding-left: 8.2rpx;

		.items {
			display: flex;
			.item {
				padding-left: 8.2rpx;
				padding-right: 30.47rpx;
				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 800;
					font-size: 13rpx;
					color: #53638B;
					line-height: 10rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}

				&.active {
					text {
						color: #0093E8;
					}
				}
			}
		}

		.underline {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			border: 0.39rpx solid #001A58;
			opacity: 0.18;
		}

		.slider {
			position: absolute;
			left: 0;
			bottom: 0;
			transform: translateY(50%);
			width: 41rpx;
			height: 4rpx;
			background: #0093E8;
			border-radius: 0rpx 0rpx 0rpx 0rpx;
		}
	}
</style>