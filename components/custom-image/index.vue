<template>
    <view style="min-height: 1px;">
        <u--image :width="width" :height="height" :mode="mode" :src="src" @click="show = true"></u--image>
        <u-popup v-if="show" :show="show" @close="close" @open="open" mode="center" duration="0" closeOnClickOverlay>
            <view class="body" @click="colse">
                <u--image :src="src" width="750rpx" mode="widthFix"/>
            </view>
        </u-popup>
    </view>
</template>

<script>
export default {
    name: "custom-image",
    props: {
        src: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: '100rpx'
        },
        height: {
            type: String,
            default: '100rpx'
        },
        mode:{
            type:String,
            default:"widthFix"
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        colse() {
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.body {
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .u-fade-enter-to {
        // background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>