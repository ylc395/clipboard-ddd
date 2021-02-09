<script lang="ts">
import FormService from "../lib/globalServices/FormService";
import { inject } from "vue";
import FormItemService from "../lib/globalServices/FormItemService";
import { FormItemProps, FormItem } from "../lib/globalServices/Form";
export default {
  name: "FormItem",
  props: ["name", "label", "rules", "token", "initialValue"],
  setup(props: FormItemProps, ctx) {
    const form = inject(FormService.formToken);
    const formItem = new FormItemService(props);
    return formItem;
  },
};
</script>

<template>
  <div ref="childRef">
    <slot></slot>
  </div>
</template>