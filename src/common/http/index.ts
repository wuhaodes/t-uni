import config from "@/config";
import interceptorO, {
  INTERCEPTOR_CONSTANTS,
  interceptors,
} from "./interceptors";

function defaultRequstIn(data: Dic = {}, header: Dic = {}) {
  return { data, header };
}

function defaultResponseIn(data: Dic = {}) {
  return data;
}

export default new (class Http {
  private prefix = config.prefix;
  private host = config.host;
  //   private retry = 0; // todo 重试机制添加
  private async request(
    method: MethodType,
    api: string,
    data: Dic = {},
    opt = { catch: true, loading: true, name: "" }
  ) {
    const url = this.getCompleteUrl(api);
    let header = {};

    opt.loading && uni.showLoading({ title: "正在加载中", mask: true });

    const isInterceptorRequest = INTERCEPTOR_CONSTANTS.includes(opt.name);
    const skip = isInterceptorRequest ? interceptorO[opt.name] : [];

    for (let interceptor of interceptors) {
      if (skip.includes(interceptor.name)) {
        continue;
      }
      const fn = interceptor.request || defaultRequstIn;
      const requestRes = await fn.call(interceptor, data, header);
      header = requestRes.header;
      data = requestRes.data;
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method,
        data,
        header,
        success: async (res) => {
          let { statusCode, data } = res;
          if (statusCode < 200 || (statusCode > 300 && statusCode != 304)) {
            reject({
              errMsg: `request:fail invalid statusCode:${status}`,
              statusCode: status,
            });
          }
          for (let interceptor of interceptors) {
            const fn = interceptor.response || defaultResponseIn;
            data = await fn.call(interceptor, data);
          }
          resolve(data);
        },
        fail: async (error) => {
          reject(error);
        },
        complete: () => {
          opt.loading && uni.hideLoading();
        },
      });
    });
  }
  post(api: string, data: Dic = {}, opt: RequestOptionsType) {
    return this.request("POST", api, data, opt);
  }
  get(api: string, params: Dic = {}, opt: RequestOptionsType) {
    return this.request("GET", api, params, opt);
  }
  private getCompleteUrl(api: string) {
    if (api.startsWith("https") || api.startsWith("http")) {
      return api;
    }
    return `${this.host}${this.prefix}${api}`;
  }
})();
