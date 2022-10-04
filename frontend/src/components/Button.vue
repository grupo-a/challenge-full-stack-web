<script>
export default {
  name: "ButtonBase",

  props: {
    color_botton: { type: String, required: false },
    class_botton: { type: String, required: false },
    redirect_botton: { type: String, required: false },
    context_botton: { type: String, required: false },
    action_click: { type: Function, required: false, default: () => undefined },
  },
};
</script>

<template>
  <v-btn
    :color="color_botton"
    :class="class_botton"
    :to="redirect_botton"
    @click="action_click"
    >{{ context_botton }}</v-btn
  >
</template>
