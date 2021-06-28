<template>
  <view class="wrap">
    <slot name="default"></slot>
    <auth ref="auth" />
    <eject ref="eject" />
  </view>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import Auth from "@/components/Auth.vue";
import Eject from "@/components/Eject.vue";
import Process from "@/mixins/Process";

@Component({ components: { Auth, Eject } })
export default class Wrap extends Mixins(Process) {
  mounted() {
    // 往页面上挂select方法
    this.$parent.select = this.select.bind(this);
  }
}
</script>

<style lang="scss" scoped>
uni-page-body,
uni-page-refresh {
  height: 100%;
}
.wrap {
  background-color: #fff;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
