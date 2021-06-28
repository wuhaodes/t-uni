<template>
  <wrap class="content">aa</wrap>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Wrap from "@/components/Wrap.vue";

@Component({ components: { Wrap } })
export default class Index extends Vue {
  title = "";
  async mounted() {
    const res = await this.select("eject").display({
      title: "提示",
      confirmText: "确定",
      cancelText: "取消",
      content: "删除后无法恢复",
    });
    console.log(res, "res");
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
