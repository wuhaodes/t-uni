import { Vue, Component } from "vue-property-decorator";

// 所有切换显示/隐藏的组件公用的mixin 必须引入
@Component
export default class ProcessControl extends Vue {
  show = false;
  resume = false;
  reset() {
    this.show = false;
  }
  cancel() {
    this.complete(false);
  }
  confirm() {
    this.complete(true);
  }

  /**
   * @description 流程化可以显示隐藏切换的组件
   * @param opts 传入组件中的数据/data
   * @returns Promise<any>
   */
  display(opts: any) {
    return new Promise((resolve) => {
      const options = { show: true, ...opts } as any;
      for (const key in options) {
        if (!options.hasOwnProperty(key)) {
          continue;
        }
        this.$set(this, key, options[key]);
      }
      this.complete = (res: any) => {
        this.show = false;
        this.resume && this.reset();
        resolve(res);
      };
    });
  }
}
