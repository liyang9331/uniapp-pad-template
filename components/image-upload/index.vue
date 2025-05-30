<template>
	<view class="upload-box">
		<u-upload ref="upload" :width="style.width" :height="style.width" :fileList="fileList" :multiple="multiple"
			:maxCount="maxCount" :maxSize="maxSize * 1024 * 1024" @afterRead="afterRead" @delete="deletePic"
			:disabled="disabled" :deletable="!disabled"></u-upload>
		<view class="remark" v-if="!disabled">最多允许上传{{
            maxCount }}张现场图片
		</view>
	</view>
</template>

<script>
	export default {
		name: 'image-upload',
		props: {
			value: {},
			maxCount: {
				type: Number,
				default: 1
			},
			// 最大上传大小 mb
			maxSize: {
				type: Number,
				default: 2
			},
			// 是否多选
			multiple: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			style: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				photoList: [],
				fileList: []
			}
		},
		computed: {},
		watch: {
			value: {
				handler(newVal, oldVal) {
					// console.log(newVal, oldVal);
					if (this.fileList.length == 0 && this.value != "" && this.value != null) {
						this.value.split(",").forEach((item) => {
							this.fileList.push({
								message: "",
								name: "测试名称.png",
								size: 204922,
								status: "success",
								// thumb: "blob:http://localhost:8080/d6f664d5-07ef-4414-857c-feff6ee115c5",
								type: "image",
								url: item
							});
						});
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			console.log(this.disabled)
		},
		mounted() {},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				const url = this.fileList.map(item => item.url).join(",")
				this.$emit("input", url);
			},
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				// console.log('==========lists===========',lists)
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: "uploading",
						message: "上传中",
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = JSON.parse(await this.uploadFilePromise(lists[i].url));
					// console.log('=========',result)
					let item = this.fileList[event.index];
					this.fileList.splice(
						event.index,
						1,
						Object.assign(item, {
							status: "success",
							message: "",
							url: result.data[0].filePath,
						})
					);
				}
				// console.log(this.fileList)
				const url = this.fileList.map(item => item.url).join(",")
				// console.log(url)
				this.$emit("input", url);
				// this.$emit("change", url);
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.$api + "upload",
						filePath: url,
						name: "file",
						header: {
							Authorization: uni.getStorageSync("token").token,
							timestamp: String(new Date().getTime()),
							sign: "",
						},
						success: (res) => {
							resolve(res.data);
						},
					});
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.upload-box {
		width: 100%;
	}

	.upload-btn {
		width: 100%;
		margin-left: unset;
	}

	.upload-tips {
		margin-bottom: 10rpx;
		text-align: right;
		font-size: 20rpx;
		color: #999999;
	}

	.upload-list-box {
		border-bottom: 1rpx solid #d8d8d8;
		padding-bottom: 8rpx;
		margin-bottom: 24rpx;
	}

	.upload-list {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16rpx;

		.upload-name {
			margin-right: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			flex: 1;
			min-width: 0;
		}
	}

	.remark {
		font-size: 10rpx;
		flex-basis: 100%;
		color: #ea480f;
	}
</style>