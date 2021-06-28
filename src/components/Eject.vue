<template>
  <view class="eject-view" v-if="show">
    <view class="eject-mask-view" catchtouchmove="handleMaskMove"></view>
    <view class="eject-container" catchtouchmove="handleMaskMove">
      <view class="eject-wrapper">
        <image
          class="fork-button"
          src="https://asset.ls.iumx.cn/assets/images/eject-fork.png"
          @click.stop="cancel"
          v-if="showFork"
          lazy-load="true"
        />
        <view class="eject-title">
          <image
            class="eject-title-back"
            src="https://asset.ls.iumx.cn/assets/images/toast-title-back.png"
            lazy-load="true"
          />
          <view class="title">{{ title }}</view>
        </view>
        <view class="eject-content" v-if="content">
          {{ content }}
        </view>
        <view class="operate-view" v-if="cancelText">
          <view class="operate-cancel" @click.stop="cancel">{{
            cancelText
          }}</view>
          <view class="operate-confirm confirm1" @click.stop="confirm">{{
            confirmText
          }}</view>
        </view>
        <view class="operate-view" v-else-if="confirmText">
          <view class="operate-confirm confirm2" @click.stop="confirm">{{
            confirmText
          }}</view>
        </view>
        <view v-else></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ProcessControl from "@/mixins/ProcessControl";

@Component
export default class Eject extends Mixins(ProcessControl) {
  showFork = false;
  cancelText = "";
  confirmText = "";
  content = "";
  title = "";
  mounted() {}
}
</script>

<style lang="scss" scoped>
.eject-view {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  z-index: 12;

  .eject-mask-view {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(51, 51, 51, 0.7);
    z-index: 13;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
  }

  .eject-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 0 122rpx;
    z-index: 14;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;

    .eject-wrapper {
      background: rgba(255, 255, 255, 1);
      border-radius: 32rpx;
      position: relative;
      z-index: 15;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;

      .fork-button {
        position: absolute;
        right: 20rpx;
        top: 4rpx;
        width: 80rpx;
        height: 80rpx;
        display: block;
        z-index: 18;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
      }

      .eject-title {
        width: 100%;
        height: 90rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        position: relative;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;

        .title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .eject-title-back {
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
      }

      .eject-content {
        font-size: 28rpx;
        color: rgba(102, 102, 102, 1);
        padding: 53rpx 40rpx;
      }

      .operate-view {
        padding: 0 43rpx 60rpx 43rpx;
        display: flex;
        justify-content: space-between;

        .operate-cancel {
          width: 190rpx;
          height: 80rpx;
          background: rgba(204, 204, 204, 1);
          border-radius: 40rpx;
          font-size: 28rpx;
          color: rgba(255, 255, 255, 1);
          line-height: 80rpx;
        }

        .operate-confirm {
          height: 80rpx;
          background: linear-gradient(
            270deg,
            rgba(167, 146, 255, 1) 0%,
            rgba(139, 156, 255, 1) 100%
          );
          border-radius: 40rpx;
          font-size: 28rpx;
          color: rgba(255, 255, 255, 1);
          line-height: 80rpx;
          box-sizing: border-box;
          text-align: center;
          overflow: hidden;

          &.confirm1 {
            width: 190rpx;
          }

          &.confirm2 {
            flex: 1;
          }

          &:active {
            background: linear-gradient(
              270deg,
              rgba(143, 124, 217, 1) 0%,
              rgba(118, 132, 211, 1) 100%
            );
          }
        }
      }
    }
  }
}
</style>