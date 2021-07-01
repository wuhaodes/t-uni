type envType = "development" | "test" | "production";
const defautInfo = {
  development: "",
  test: "",
  production: "",
};
type envInfoType = typeof defautInfo;
export default new (class {
  private env: envType = process.env.NODE_ENV;
  private hosts: envInfoType = {
    development: "https://xxxx.xxx.dev.com",
    test: "https://xxxx.xxx.qa.com",
    production: "https://xxxx.xxx.com",
  };
  private prefixes: envInfoType = {
    development: "/api",
    test: "/api",
    production: "/api",
  };
  get host() {
    return this.hosts[this.env];
  }
  get prefix() {
    return this.prefixes[this.env];
  }
  get storagePrefix() {
    return this.env + "_$storage";
  }
})();
