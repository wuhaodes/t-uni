<template>
  <view v-show="show">auth</view>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ProcessControl from "@/mixins/ProcessControl";

@Component
export default class Auth extends Mixins(ProcessControl) {}
</script>
