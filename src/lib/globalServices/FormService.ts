import { provide, InjectionKey, watchEffect } from "vue";
import { Form, FormProps } from "./Form";

export default class FormService extends Form {
  static formToken: InjectionKey<FormService> = Symbol();
  static newForm(props: FormProps) {
    const form = new FormService(props);
    provide(FormService.formToken, form);
    return form;
  }

  constructor(props: FormProps) {
    super(props);
    watchEffect(() => {
      console.log(this.value.value);
    });
  }
}
