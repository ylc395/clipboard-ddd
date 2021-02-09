import { Ref, ref, InjectionKey, provide } from "vue";

export default class AppService {
  static token: InjectionKey<AppService> = Symbol();
  static getInstance() {
    return new AppService("test app");
  }

  public appName: Ref<string>;
  constructor(initAppName: string) {
    this.appName = ref(initAppName);
  }
}
