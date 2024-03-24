<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineEmits<{ (e: "update:modelValue", value: string): void }>();
defineProps<{
  placeholder: string;
  modelValue?: string;
  id?: string;
  class?: string;
}>();
</script>

<template>
  <div
    class="input-group"
    :class="class"
  >
    <input
      v-bind="$attrs"
      class="input-group__input"
      :value="modelValue"
      :placeholder
      :id
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <label
      class="input-group__placeholder"
      v-bind:for="$props.id"
      >{{ placeholder }}</label
    >
  </div>
</template>

<style scoped lang="scss">
@use "../../styles/" as *;

.input-group {
  position: relative;

  &__placeholder {
    @include position(absolute, $top: 50%, $left: 0);
    @extend .transition;
    transform: translate(5px, -50%);
    opacity: 0.8;
    pointer-events: none;
  }

  &__input {
    @extend .transition;
    width: 100%;
    padding: 11px 3px;
    background-color: transparent;
    border-bottom: 1px solid clr(text);
    opacity: 0.8;
    outline: none;

    &:focus,
    &:not(:placeholder-shown) {
      opacity: 1;
    }

    &:focus + .input-group__placeholder,
    &:not(:placeholder-shown) + .input-group__placeholder {
      top: 10%;
      font-size: 10px;
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.4;
    }

    &::placeholder {
      color: transparent;
    }
  }
}
</style>
