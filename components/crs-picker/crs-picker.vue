<template>
	<view class="crs-picker" @touchmove.stop.prevent="moveHandle">
		<uni-popup ref="popup" type="top"  @change="popupChange">
			<uni-nav-bar @clickLeft="clickLeft" @clickRight="tapOK" rightText="确定" left-icon="closeempty" :title="title"
				:border="null"></uni-nav-bar>
			<view class="usb">
				<uni-search-bar v-if="showSearch && data.length" :radius="100" cancelButton="none"
					v-model="searchVal"></uni-search-bar>
			</view>
			<view class="main" v-if="finData.length">
				<scroll-view scroll-y="true" @scrolltolower="lower" :lower-threshold="200">
					<view class="scroll-view-item" v-for="(v,i) in finData" :key="i" @tap="tapItem(v.label,v.value)"
						:class="selected.indexOf(v.value)>-1?'selected':null">
						<text>{{v.label}}({{v.value}})</text>
						<icon v-show="selected.indexOf(v.value)>-1" type="success_no_circle" size="22" />
					</view>
					<view v-if="showBottom" class="isBottom">已经到底啦~</view>
				</scroll-view>
				<view class="loadingBox" v-show="loading">
					<uni-load-more status="loading"></uni-load-more>
				</view>
			</view>
			<view v-else class="empty">
				<view class="xw-empty">
					<image :src="baseImg" mode="widthFix"></image>
					<text style="color: #777777;">暂无选项</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "./uni-popup-crs.vue"
	import pinyinMatch from './pinyin-match.js'
	import UniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import UniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		name: 'CrsPocker',
		components: {
			uniPopup,
			UniSearchBar,
			UniNavBar
		},
		props: {
			title: {
				type: String,
				default: '请选择'
			},
			value: {
				type: Boolean,
				required: true
			},
			data: {
				type: Array,
				required: true
			},
			multiple: {
				type: Boolean,
				default: true
			},
			showSearch: {
				type: Boolean,
				default: false
			},
			searchInput: Function,
			initSelected: Array
		},
		data() {
			return {
				list: [], //全部数据
				selected: [],
				selectedItems: [],
				showBottom: false,
				loading: false,
				searchVal: '',

				total: 0,
				page: 1,
				size: 15,
				finData: [], //分页展示的数据
				baseImg: 'data:image/png;base64,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'

			}
		},
		created() {
			this.dataInit()
		},
		onShow() {
			// console.log('onShow');
			// if(this.multiple&&this.title=='选择备件'){
			// 	this.clickLeft();//清空上一次的选择结果
			// }
		},
		watch: {
			value(n, o) {
				if (n) this.$refs.popup.open()
				else this.$refs.popup.close()
			},
			data(n, o) {
				this.loading = false
				this.showBottom = false
				this.dataInit()
			},
			searchVal() {
				this.inputSearch()
			},
			initSelected(n) {
				let temp = []
				let templist = []
				n.forEach(function(item) {
					var obj = new Object();
					obj.lab = item.label;
					obj.val = item.value;
					templist.push(obj);
					temp.push(item.value)
				});
				this.selected = temp;
				this.selectedItems = templist;
				// this.selected = n

			}
		},
		methods: {
			lower: function(e) {
				// console.log("滑到底部了:"+e);
				if (this.total > this.finData.length) {
					this.page += 1;
					this.finData = this.list.slice(0, this.page * this.size);
				} else {
					this.showBottom = true
				}

			},
			dataInit() {
				if (typeof this.data[0] == "string") {
					this.list = this.data.map((v, i) => ({
						label: v,
						value: v
					}))
				} else {
					this.list = this.data
				}
				this.finData = this.list.slice(0, this.size);
				this.page = 1;
				this.total = this.list.length;
			},
			clickLeft() {
				this.selected = [];
				this.selectedItems = [];
				this.$emit("input", false)
				this.$emit("confirm", this.selectedItems);
			},
			tapItem(lab, val) {
				if (this.multiple) {
					let idx = this.selected.indexOf(val)
					if (this.title == '选择是否有附属票') {
						if (idx == -1) {
							if (val == 0) {
								//清除选中“无”以外的所有选中项
								this.selected = []
								this.selectedItems = []
							} else {
								//清除选中选项“无”
								const idx2 = this.selected.indexOf(0);
								// console.log('选择下标',idx,val,idx2)
								if (idx2 > -1) {
									this.selected.splice(idx2, 1);
									this.selectedItems.splice(idx2, 1);
								}
							}
							this.selected.push(val);
							var obj = new Object();
							obj.lab = lab;
							obj.val = val;
							this.selectedItems.push(obj);
						} else {
							this.selected.splice(idx, 1);
							this.selectedItems.splice(idx, 1);
						}
					} else {
						if (idx == -1) {
							this.selected.push(val);
							var obj = new Object();
							obj.lab = lab;
							obj.val = val;
							this.selectedItems.push(obj);
						} else {
							this.selected.splice(idx, 1);
							this.selectedItems.splice(idx, 1);
						}
					}

				} else {
					this.selected = [val];

					var obj = new Object();
					obj.lab = lab;
					obj.val = val;
					this.selectedItems.splice(0, 1);
					this.selectedItems.push(obj);

					this.$emit("confirm", this.selectedItems);
					this.$emit("input", false)

				}
				this.$emit("change", this.selectedItems)
			},
			tapOK() {
				this.$emit("input", false)
				this.$emit("confirm", this.selectedItems)

				if (this.multiple && this.title == '选择备件') {
					this.selectedItems = [] //清空上次选值
				}
			},
			popupChange(e) {
				this.$emit("input", e.show)
			},
			inputSearch() {
				let val = this.searchVal
				if (this.searchInput) {
					this.loading = true
					this.searchInput(val)
					return
				}
				this.showBottom = false
				var pattern = new RegExp("[A-Za-z]+");
				// console.log('拼音搜索',pinyinMatch.match('张小海',val),this.data)
				if (typeof this.data[0] == 'string') {
					if (pattern.test(this.searchVal)) {
						//英文
						this.list = this.data.filter(v => pinyinMatch.match(v, val)).map((v, i) => ({
							label: v,
							value: v
						}))
					} else {
						//中文
						this.list = this.data.filter(v => v.indexOf(val) > -1).map((v, i) => ({
							label: v,
							value: v
						}))
					}

				} else {
					if (pattern.test(this.searchVal)) {
						//英文
						this.list = this.data.filter(v => pinyinMatch.match(v.label, val))
					} else {
						//中文
						this.list = this.data.filter(v => v.label.indexOf(val) > -1)
					}

				}
				this.finData = this.list.slice(0, this.size);
				this.page = 1;
				this.total = this.list.length;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.crs-picker {
		/deep/ .uni-popup {
			.uni-popup__wrapper-box {
				background: #fff;
				width: 60vw;
				height: 50vh;
				margin: 0 auto;
				border-radius: 10rpx;
				margin-top: calc(50vh - 25vh);
				overflow: hidden;
				display: flex;
				flex-direction: column;

				.uni-searchbar {
					width: 250rpx;
					margin: 0 auto;
					.uni-searchbar__box{
						height: 23rpx;
						.uniui-search{
							font-size: 12rpx !important;
						}
					}
				}

				.uni-navbar__header {
					font-size: 11rpx;
					padding-top: 5rpx;
					padding-left: 5rpx;
					padding-right: 5rpx;
				}

				.uni-navbar__header-btns {
					display: flex;

					.uniui-closeempty {
						font-size: 15rpx !important;
					}
				}

				.main {
					height: calc(100% - 88rpx - 104rpx);
					flex: 1;
					position: relative;
					display: flex;
					justify-content: center;
					scroll-view {
						height: 100%;
						width: 65%;

						uni-view {
							box-sizing: border-box;
							padding: 18rpx 44rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							min-height: 80rpx;

							&.selected {
								background: rgba($uni-color-primary, .1);
							}

							uni-text {
								width: 85%;
							}
						}

						.isBottom {
							display: flex;
							justify-content: center;
							color: #777;
							position: relative;
							font-size: 24rpx;

							&::after {
								content: '';
								position: absolute;
								bottom: 10rpx;
								width: 60rpx;
								height: 4rpx;
								left: 50%;
								transform: translateX(-51%);
								background: #777;
							}
						}
					}

					.loadingBox {
						height: 100%;
						width: 100%;
						position: absolute;
						top: 0;
						left: 0;
						background: rgba(255, 255, 255, .7);
						z-index: 2;

						.uni-load-more {
							display: flex;
							justify-content: center;
							position: absolute;
							width: 100%;
							top: 35%;
							left: 50%;
							transform: translate(-50%);
						}
					}
				}


				.scroll-view-item {
					font-size: 11rpx;
					min-height: 11rpx;
				}

				.uni-navbar__header-container-inner,
				.uni-nav-bar-text,
				.uni-nav-bar-right-text,
				.uni-searchbar__box-search-input {
					font-size: 11rpx;
				}

				.scroll-view-item {
					padding: 5rpx 10rpx !important;
					min-height: 30rpx !important;
				}
			}
		}
	}

	.xw-empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 400rpx;
		width: 100%;
		align-items: center;
		color: #555555;
		font-size: 24rpx;

		image {
			width: 200rpx;
			margin-bottom: 50rpx;
		}
	}
</style>