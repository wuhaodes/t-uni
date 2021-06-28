// 全局声明类型Basic/Dic/Response
declare global {
  declare type Basic = boolean | number | string | undefined | null;

  declare interface Dic<T = any> {
    [index: string | number]: T;
  }

  declare interface Response<T = any> {
    msg: string | undefined;
    data: T;
    code: number;
  }
}

// .vue中声明Vue类型
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// Vue类型中声明属性和方法
declare module "vue/types/vue" {
  interface Vue {
    $http: {
      (methods: string, api: string, options?: Dic): Promise<Response>;
      get(api: string, params?: Dic): Promise<Response>;
      post(api: string, data?: Dic): Promise<Response>;
      put(api: string, data?: Dic): Promise<Response>;
      delete(api: string, data?: Dic): Promise<Response>;
    };
    $vm: Vue.Component;
    // 该方法存在于引入mixins ProcessControl的组件
    complete: (res: Dic | Basic) => any;
    // 该方法存在于被wrap和wrap包裹的页面
    /**
     * @description 获取组件实例
     * @param id 组件唯一id 注册于wrap中
     * @returns 返回组件实例vm
     */
    select(id: string): any;
  }
}
