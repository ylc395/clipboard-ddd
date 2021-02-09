import AppService from "./globalServices/AppService";
import ClipboardService from "./globalServices/ClipboardService";

export default {
  AppService,
  ClipboardService,
  setup() {
    AppService.getInstance();
  },
  install(app) {
    app.provide(AppService.token, AppService.getInstance());
  },
};
