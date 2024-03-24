<script setup lang="ts">
import { onUnmounted } from "vue";
import IconLogo from "./icons/Logo.vue";
import { useFormValues } from "../composables";

const { isSubmitted } = useFormValues();

onUnmounted(() => (isSubmitted.value = false));
</script>

<template>
  <div class="submission">
    <p class="submission__heading">Спасибо за заявку</p>
    <p class="submission__text">
      Я обязательно свяжусь с вами в ближайшее время.
    </p>
    <span class="submission__logo">
      <IconLogo class="submission__logo-icon"
    /></span>
    <div class="submission__gradient"></div>
  </div>
</template>

<style scoped lang="scss">
@use "../styles" as *;

.submission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;

  &__heading {
    margin-bottom: 98px;
    margin-top: 95px;
    padding: 0 120px;
    font-size: fs(3xl);
    line-height: 1.5;
  }

  &__text {
    flex: 1;
    padding: 0 60px;
    font-size: fs(2xl);
    line-height: 1.4;
    margin-bottom: 209px;
  }

  &__logo {
    width: 169px;
    padding: 8.5px 0;
    line-height: 0;
    border: 1px solid clr(text);
    border-left: none;
    border-right: none;
    align-self: flex-end;
  }

  &__logo-icon {
    width: 100%;
  }

  &__gradient {
    position: absolute;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(ellipse, clr(gradient) 1%, transparent);
    filter: blur(25px);
    bottom: -15%;
    right: -50%;
    z-index: 1000;
    transform: rotate(45deg);
  }
}

@media only screen and (max-width: 576px) {
  .submission__heading {
    padding: 0 30px;
    margin-top: 50px;
    margin-bottom: 50px;
    font-size: fs(2xl);
  }
  .submission__text {
    font-size: fs(xl);
    padding: 0 10px;
  }
}
</style>
