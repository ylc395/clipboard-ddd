<script lang="ts">
import Form from "./components/Form.vue";
import FormItem from "./components/FormItem.vue";
export default {
  name: "App",
  components: { "test-form": Form, "test-form-item": FormItem },
};
</script>

<template>
  <test-form>
    <test-form-item name="fuck" initialValue="fuck">
      <input />
    </test-form-item>
  </test-form>
</template>
