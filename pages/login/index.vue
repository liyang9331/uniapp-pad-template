<template>
	<view class="page">
		<!-- 占位 -->
		<view class="status_bar" :style="headStyle"></view>
		<u-navbar :autoBack="true">
			<view slot="left"></view>
		</u-navbar>
		<view class="center">
			<view class="center-box">
				<image class="logo" :src="logo"></image>
				<!-- from表单 -->
				<view class="from">
					<!-- <view class="form-bg"></view> -->
					<view class="from-box">
						<u-form :model="userInfo" ref="loginfrom" :rules="rules">
							<u-form-item prop="phone" class="input">
								<!-- type="number" -->
								<u-input placeholder="请输入账号" v-model="userInfo.phone">
									<image slot="prefix" class="icon" src="/static/img/login/account.png">
									</image>
								</u-input>
							</u-form-item>
							<u-form-item prop="password" class="input" style="margin-top: 18.75rpx;">
								<u-input type="password" placeholder="请输入密码" v-model="userInfo.password">
									<image slot="prefix" class="icon" src="/static/img/login/pwd.png">
									</image>
								</u-input>
							</u-form-item>
							<view class="text">
								忘记密码
							</view>
							<view class="btn" @click="formSubmit">
								<text class="text">立即进入</text>
							</view>
						</u-form>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins/applet-compatibility.js";
	import * as api from "@/api/user.js";
	import storetoken_mixin from "@/mixins/check-login.js";
	export default {
		mixins: [mixin, storetoken_mixin],
		data() {
			return {
				logo: require("@/static/img/login/logo.png"),
				userInfo: {
					password: "",
					phone: "",
				},
				rules: {
					phone: [{
							type: "string",
							required: true,
							message: "请输入账号",
						},
						// {
						// 	message: "请输入正确的电话号码",
						// 	validator: (rule, value) => {
						// 		return uni.$u.test.mobile(value);
						// 	},
						// },
					],
					password: [{
						type: "string",
						required: true,
						message: "请输入密码",
					}, ],
				},
			};
		},
		onLoad() {},
		methods: {
			formSubmit() {
				this.$refs.loginfrom
					.validate()
					.then((res) => {
						// 验证通过
						api
							.login({
								password: this.userInfo.password,
								userName: this.userInfo.phone,
							})
							.then((res) => {
								// 将用户信息保存到vuex
								this.$store.commit("login", res.data.data);
								// 本地缓存user info
								const flag = this.storageToken(res.data.data);
								if (flag) {
									uni.showToast({
										title: res.data.message,
										icon: "success",
										complete: (res) => {
											setTimeout(() => {
												// 跳转到首页
												uni.redirectTo({
													url: "../index/index",
												});
											}, 1500);
										},
									});
								} else {}
							}).catch(err => {
								uni.showToast({
									title: err.data.message,
									icon: "none"
								});
							})
					})
					.catch((err) => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
	}


	/deep/ .u-form-item__body__right__message {
		font-size: 12rpx;
		line-height: 12rpx;
	}

	.text {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 12rpx;
		color: #FFFFFF;
		line-height: 23rpx;
		margin-top: 9.38rpx;
		text-align: right;
		font-style: normal;
		text-transform: none;
	}

	.center {
		width: 100%;
		height: calc(100vh - 44px);
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: url("/static/img/login/bg.png");
		background-size: 100%;

		.center-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			.logo {
				width: 311.33rpx;
				height: 34.41rpx;
				margin-bottom: 35.55rpx;
			}



			.from {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 429.69rpx;
				height: 251.17rpx;
				position: relative;
				border-radius: 7.81rpx 7.81rpx 7.81rpx 7.81rpx;
				box-shadow: inset 0 0 0 1px #ccc;
				/* 内阴影模拟边框 */
				overflow: hidden;
				background-image: url("/static/img/login/jx.png");
				background-size: 100%;

				.form-bg {
					// background-color: #FFFFFF;
					background: rgba(255, 255, 255, 0.5);
					/* 透明度 50% */
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					// filter: blur(4.69rpx);
					z-index: 1;
				}

				.from-box {
					width: 100%;
					height: calc(100% - 33.2rpx);
					z-index: 2;
					padding-top: 33.2rpx;

					/deep/ .u-form {
						padding-right: 27.34rpx;
						padding-left: 27.34rpx;
					}

					.input {
						// width: 960rpx;
						// margin: 0 auto;

						.icon {
							width: 16.41rpx;
							height: 16.41rpx;
						}

						/deep/ .u-form-item__body {
							padding: 0;
							// width: 100%;
							// height: 100%;
						}
					}

					& /deep/ .u-input {
						height: 42.97rpx;
						box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0, 0, 0, 0.06);
						border-radius: 31rpx 31rpx 31rpx 31rpx;
						border: 1rpx solid #B8CDFF;
						padding-top: 0 !important;
						padding-right: 0 !important;
						padding-bottom: 0 !important;
						padding-left: 20.7rpx !important;
						background: #FFFFFF;

						input {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 12rpx !important;
							color: #939FB7;
							line-height: 23rpx;
							text-align: left;
							font-style: normal;
							text-transform: none;
						}
					}
				}
			}

		}
	}


	.btn {
		width: 375rpx;
		height: 35rpx;
		background: linear-gradient(120deg, #5EC4FF 0%, #0093E8 100%);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		margin-top: 20.31rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			font-family: PingFang SC, PingFang SC;
			font-weight: bold;
			font-size: 12rpx;
			color: #FFFFFF;
			text-align: left;
			font-style: normal;
			text-transform: none;
			margin: 0;
		}
	}

	.text-bg {
		margin-top: 31rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		opacity: 1;
		text-align: center;
	}
</style>