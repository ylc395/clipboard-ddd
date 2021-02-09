<script lang="ts">
import FormService from "../lib/globalServices/FormService";
import { FormProps } from "../lib/globalServices/Form";
import { watchEffect, watch } from "vue";
export default {
  name: "Form",
  props: ["initialValue", "layout", "rules"],
  setup(props: FormProps) {
    const form = FormService.newForm(props);
    watch([form.value.value], (val) => {
      console.log(val);
    });
  },
};
</script>

<template>
  <div>this is form</div>
  <slot></slot>
</template>