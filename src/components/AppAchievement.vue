<script setup lang="ts"></script>

<template>
  <div class="achievement">
    <p class="achievement__number">
      <slot name="number"></slot>
    </p>
    <p class="achievement__description">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
@use "../styles" as *;

.achievement {
  @include flex($direction: column);
  padding-left: 24px;

  position: relative;

  @include breakpoint(sm) {
    padding-left: 8px;
  }

  &::before {
    content: "";
    position: absolute;
    left: -1px;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: currentColor;
    opacity: 0.6;
  }

  &__number {
    margin-bottom: 28px;
    font-family: ff(montserrat);
    font-size: fs(2xl);
    font-weight: fw(semibold);
    line-height: 1.41;
    text-align: left;

    @include breakpoint(sm) {
      font-size: fs(base);
      margin-bottom: 2px;
    }
  }

  &__description {
    opacity: 0.5;

    @include breakpoint(sm) {
      font-size: fs(xxs);
    }
  }
}
</style>
