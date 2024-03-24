<script setup lang="ts">
import CheckboxIcon from "../icons/Check.vue";

defineOptions({ inheritAttrs: false });
defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
defineProps<{
  modelValue?: boolean;
  class?: string;
}>();
</script>

<template>
  <label
    class="checkbox"
    :class="class"
  >
    <input
      v-bind="$attrs"
      :checked="modelValue"
      class="checkbox__input"
      type="checkbox"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span class="checkbox__icon-wrapper">
      <CheckboxIcon class="checkbox__checkmark"
    /></span>
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">
@use "../../styles" as *;

.checkbox {
  @extend .transition;
  @include flex($align: center);
  position: relative;
  cursor: pointer;

  &__input {
    appearance: none;
    background-color: transparent;

    &:active + .checkbox__icon-wrapper .checkbox__checkmark {
      transform: scale(0.7);
    }

    &:checked + .checkbox__icon-wrapper .checkbox__checkmark {
      opacity: 1;
    }

    &:hover:not(:checked) + .checkbox__icon-wrapper .checkbox__checkmark {
      opacity: 0.2;
    }

    &:focus-visible:not(:checked)
      + .checkbox__icon-wrapper
      .checkbox__checkmark {
      opacity: 0.2;
    }

    &:focus-visible + .checkbox__icon-wrapper {
      outline-color: currentColor;
    }
  }

  &__checkmark {
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &__icon-wrapper {
    @include flex($align: center, $justify: center);
    padding: 2px;
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-width: 30px;
    margin-right: 23px;
    border: 1px solid currentColor;
    outline: 1px solid transparent;
    outline-offset: 2px;

    @include breakpoint(sm) {
      margin-right: 17px;
      min-width: 15px;
      min-height: 15px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
