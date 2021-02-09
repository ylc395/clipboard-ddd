import { ref, onMounted, onUnmounted } from "vue";
import { FormItem, FormItemProps } from "./Form";

export default class FormItemService extends FormItem {
  public childRef = ref<any>(null);
  public ChildEl = ref<any>(null);
  constructor(props: FormItemProps) {
    super(props);
    this.bindingForm();
    onMounted(() => {
      if (!this.childRef.value || !this.childRef.value.children[0]) return;
      this.ChildEl.value = this.childRef.value.children[0];
      this.ChildEl.value.value = this.form.value.value[this.name];
      this.ChildEl.value.addEventListener("input", this.listenInput.bind(this));
    });
    onUnmounted(() => {
      this.ChildEl.value.removeEventListener(
        "input",
        this.listenInput.bind(this)
      );
    });
  }
  listenInput(e) {
    this.form.value.value = {
      ...this.form.value.value,
      [this.name]: e.target.value,
    };
  }
  bindingForm() {
    this.form.keys.value = [...this.form.keys.value, this.name];
    this.form.items.value = { ...this.form.items.value, [this.name]: this };
    if (!this.form.value.value[this.name]) {
      this.form.value.value = {
        ...this.form.value.value,
        [this.name]: this.initialValue,
      };
    }
  }
}
