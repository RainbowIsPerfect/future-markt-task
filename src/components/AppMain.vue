<script setup lang="ts">
import { computed, ref } from "vue";
import { useAchievements, useFormValues, useBreakpoints } from "../composables";
import AppAchievement from "./AppAchievement.vue";
import AppForm from "./AppForm.vue";
import AppSidebar from "./AppSidebar.vue";
import AppSubmission from "./AppSubmission.vue";
import ArrowIcon from "./icons/Arrow.vue";

const { breakpoints } = useBreakpoints();

const isOpen = ref(false);
const { isSubmitted } = useFormValues();
const { productivity, technics } = useAchievements();

const productivityText = computed(() =>
  breakpoints.lg.value ? "увеличение личной продуктивности" : "продуктивности",
);

const techicsText = computed(() =>
  breakpoints.lg.value ? "техник для достижения целей" : "техник",
);

const mainText = computed(() =>
  breakpoints.lg.value
    ? `Когда ваше время и энергия лучше сфокусированы, стремление к новым возможностям становится реальностью, ваш успех зависит от ваших действий`
    : `Ваш успех зависит от ваших действий`,
);

const callButtonText = computed(() =>
  breakpoints.lg.value ? "Бесплатная консультация" : "Заказать звонок",
);

const signButtonText = computed(() =>
  breakpoints.lg.value ? "Записаться на консультацию" : "Записаться",
);
</script>

<template>
  <main class="main">
    <div class="main__content">
      <h2 class="main__heading">Создаю условия <br />для вашего успеха</h2>

      <p class="main__text">{{ mainText }}</p>

      <div class="main__button-group">
        <button class="button button--colored main__button">
          {{ signButtonText }}
          <span class="main__button-icon-wrapper">
            <ArrowIcon class="main__button-icon" />
          </span>
        </button>

        <button
          class="button button--transparent main__button"
          @click="isOpen = true"
        >
          {{ callButtonText }}
          <span class="main__button-icon-wrapper">
            <ArrowIcon class="main__button-icon" />
          </span>
        </button>
      </div>

      <div class="main__achievements">
        <AppAchievement class="main__achievements-item">
          <template #number>{{ `${technics}+` }}</template>
          <template #description>
            {{ techicsText }}
          </template>
        </AppAchievement>

        <AppAchievement class="main__achievements-item">
          <template #number>{{ `${productivity}%` }}</template>
          <template #description>
            {{ productivityText }}
          </template>
        </AppAchievement>
      </div>
    </div>

    <div class="bg">
      <img
        class="img"
        src="../assets/mentor.png"
        alt="mentor"
      />
    </div>

    <AppSidebar
      to="#modal"
      v-model="isOpen"
    >
      <AppForm v-if="!isSubmitted" />
      <AppSubmission v-else />
    </AppSidebar>
  </main>
</template>

<style lang="scss" scoped>
@use "../styles" as *;

.main {
  position: relative;

  &__button-group {
    display: flex;
    gap: calc(32% - 380px);
    margin-bottom: 112px;

    @include breakpoint(2xl) {
      flex-direction: column;
      gap: 16px;
    }

    @include breakpoint(xl) {
      flex-direction: column;
    }
    @include breakpoint(sm) {
      gap: 16px;
      margin-bottom: 92px;
    }
  }

  &__button {
    padding: 24px 80px 24px 24px;
    width: 380px;

    font-size: fs(lg);

    @include breakpoint(2xl) {
      width: 32%;
    }

    @include breakpoint(xl) {
      width: calc(32% + 70px);
    }

    @include breakpoint(md) {
      padding: 18px 60px 18px 18px;
      font-size: fs(base);
    }

    @include breakpoint(sm) {
      width: calc(32% + 27px);
      padding: 8px 28px 8px 8px;
      text-align: center;
      font-size: fs(xxs);
    }

    &-icon-wrapper {
      @include position(absolute, $right: 0, $bottom: 0);
      @include flex($justify: flex-end, $align: flex-end);

      padding: 13px;
      height: 100%;
      width: 70px;
      border-left: 2px solid currentColor;

      @include breakpoint(md) {
        padding: 10px;
      }

      @include breakpoint(sm) {
        padding: 5px;
        width: 27px;
      }
    }
    &-icon {
      @include breakpoint(sm) {
        width: 10px;
        height: 10px;
      }
    }
  }

  &__heading {
    margin-bottom: 42px;
    font-size: fs(4xl);
    font-weight: fw(semibold);
    line-height: 1.35;
    text-transform: uppercase;

    @include breakpoint(lg) {
      font-size: fs(3xl);
    }

    @include breakpoint(sm) {
      max-width: 252px;
      font-size: 25px;
    }
  }

  &__text {
    padding-left: 24px;
    margin-bottom: 64px;
    max-width: 690px;
    color: clr(text);
    opacity: 0.5;
    line-height: 1.5;
    text-align: left;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -1px;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: currentColor;
    }

    @include breakpoint(sm) {
      margin-bottom: 50px;
      padding-left: 6px;
      max-width: 160px;
      font-size: fs(xxs);
    }
  }

  &__achievements {
    display: flex;
    margin-bottom: 50px;
    gap: calc(32% - 190px);

    @include breakpoint(md) {
      gap: calc(32% - 87px);
    }
  }

  &__achievements-item {
    width: 190px;

    @include breakpoint(md) {
      width: 87px;
    }
  }
}

.img {
  display: block;
  width: 100%;
  height: 100%;
}

.bg {
  position: absolute;
  bottom: -45px;
  right: -89px;
  z-index: -1;
  max-width: 50%;

  @include breakpoint(lg) {
    max-width: 60%;
    height: 100%;
  }
  @include breakpoint(md) {
    max-width: 100%;
    right: -100px;
  }
}
</style>
