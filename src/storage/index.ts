import config from "@/config";

const SYSTEM_INFO = "system_info";
const SESSION = "session";

export default new (class Storage {
  private _systemInfo!: any;
  private _session!: string;
  private completeKey(key: string) {
    return `${config.storagePrefix}_${key}`;
  }
  set systemInfo(info: any) {
    this._systemInfo = info;
    uni.setStorageSync(this.completeKey(SYSTEM_INFO), this._systemInfo);
  }
  get systemInfo() {
    if (!this._systemInfo) {
      let info = uni.getStorageSync(this.completeKey(SYSTEM_INFO));
      if (!info) {
        info = uni.getSystemInfoSync();
      }
      this.systemInfo = info;
    }
    return this._systemInfo;
  }
  set session(session: string) {
    this._session = session;
    uni.setStorageSync(this.completeKey(SESSION), this._session);
  }
  get session() {
    if (!this._session) {
      this.session = uni.getStorageSync(this.completeKey(SESSION));
    }
    return this._session;
  }
})();
