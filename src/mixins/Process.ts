import { Vue, Component } from "vue-property-decorator";
import ProcessControl from "./ProcessControl";

@Component
export default class Process extends Vue {
  mapChildrens: any = this.$refs;
  mounted() {}
  select(id: string) {
    const childrens = this.mapChildrens;
    const childInstance = childrens[id] as ProcessControl;
    return childInstance.$vm || childInstance;
  }
}
