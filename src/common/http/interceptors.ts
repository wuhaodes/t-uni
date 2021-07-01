import storage from "@/storage";

export const INTERCEPTOR_LOGIN = "interceptor_login";
export const INTERCEPTOR_BASIC = "interceptor_basic";
export const INTERCEPTOR_DEVICE = "interceptor_device";
export const INTERCEPTOR_CATCH = "interceptor_catch";
export const INTERCEPTOR_CONSTANTS = [
  INTERCEPTOR_LOGIN,
  INTERCEPTOR_BASIC,
  INTERCEPTOR_DEVICE,
  INTERCEPTOR_CATCH,
];

const inObj = {
  [INTERCEPTOR_DEVICE]: {
    request(data: Dic = {}, header: Dic = {}): { header: Dic; data: Dic } {
      const deviceInfo = storage.systemInfo;
      return { header, data: { ...data, deviceInfo } };
    },
    skip: INTERCEPTOR_CONSTANTS,
    name: INTERCEPTOR_DEVICE,
  },
  [INTERCEPTOR_LOGIN]: {
    request(data: Dic = {}, header: Dic = {}): { header: Dic; data: Dic } {
      // wx.login --> code ---> session
      return { header, data };
    },
    skip: [INTERCEPTOR_LOGIN, INTERCEPTOR_DEVICE],
    name: INTERCEPTOR_LOGIN,
  },
  [INTERCEPTOR_BASIC]: {
    request(data: Dic = {}, header: Dic = {}): { header: Dic; data: Dic } {
      // get basic info
      return { header, data };
    },
    skip: [INTERCEPTOR_BASIC],
    name: INTERCEPTOR_BASIC,
  },
  [INTERCEPTOR_CATCH]: {
    response(data: Dic = {}): Dic {
      return data;
    },
    skip: INTERCEPTOR_CONSTANTS,
    name: INTERCEPTOR_CATCH,
  },
} as any;

export const interceptors = Object.values(inObj) as Dic<any>[];

export default inObj;
