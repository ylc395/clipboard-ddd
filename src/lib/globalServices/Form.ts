import { Ref, ref, InjectionKey, inject } from "vue";
import FormService from "./FormService";

/**
 * the trigger where validation hanppen
 *
 * @export
 * @enum {number}
 */
export enum VALIDATION_TRIGGER_TYPE {
  blur = "blur",
  change = "change",
}

export type validatorFunc = (value, cb: (res?: string) => void) => void;

/**
 * the Rule that validates the form item
 *
 * @export
 * @class Rule
 */
export class Rule {
  type: string;
  message?: string;
  trigger?: VALIDATION_TRIGGER_TYPE;
  validator?: validatorFunc;
}

export interface FormItemProps {
  name: string;
  label: string;
  rules?: Rule[];
  token?: symbol;
  initialValue?: any;
}

/**
 * abstract formitem
 *
 * @export
 * @abstract
 * @class FormItem
 */
export abstract class FormItem {
  /**
   * cannot change once initialized
   *
   * @type {string}
   * @memberof FormItem
   */
  name: string;
  label: Ref<string> = ref("");
  hasError: Ref<Boolean> = ref(false);
  errorString: Ref<string> = ref("");
  rules: Ref<Rule[]> = ref([]);
  token: symbol | InjectionKey<Form>;
  initialValue: any;

  /**
   * the form instance
   *
   * @type {Form}
   * @memberof FormItem
   */
  form: Form;

  constructor(props: FormItemProps) {
    this.name = props.name;
    this.label.value = props.label || "";
    this.rules.value = props.rules || [];
    this.form = inject(props.token || FormService.formToken);
    console.log(this.form);
    this.initialValue = props.initialValue;
  }

  /**
   * bind current instance with form
   *
   * @abstract
   * @memberof FormItem
   */
  abstract bindingForm(): void;
}

export enum FORM_LAYOUT_OPTIONS {
  vertical = "vertical",
  herizontal = "herizontal",
  inline = "inline",
}

export interface FormProps {
  /**
   * initiallized value
   *
   * @type {{[key:string]:any}}
   * @memberof FormProps
   */
  initialValue?: { [key: string]: any };
  layout?: FORM_LAYOUT_OPTIONS;
  rules?: { [key: string]: Rule[] };
  token?: string;
}

/**
 * abstract form
 *
 * @export
 * @abstract
 * @class Form
 */
export abstract class Form {
  items: Ref<{ [key: string]: FormItem | null }> = ref({});

  /**
   * uno layer form value
   *
   * @type {Ref<{ [key: string]: any }>}
   * @memberof Form
   */
  value: Ref<{ [key: string]: any }> = ref({});
  keys: Ref<string[]> = ref([]);
  errors: Ref<string[]> = ref([]);
  rules: Ref<{ [key: string]: Rule[] }> = ref({});
  layout: Ref<FORM_LAYOUT_OPTIONS> = ref(FORM_LAYOUT_OPTIONS.vertical);
  token: string;

  /**
   * Creates an instance of Form.
   * @param {FormProps} props
   * @memberof Form
   */
  constructor(props: FormProps) {
    this.value.value = props.initialValue || {};
    this.keys.value = props.initialValue ? Object.keys(props.initialValue) : [];
    this.rules.value = props.rules || {};
    this.layout.value = props.layout || FORM_LAYOUT_OPTIONS.vertical;
    this.token = props.token || "form-" + ~~(Math.random() * 1000);
  }

  // TODO: 控制器还没想好
}
