<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { useBreakpoints } from "../composables";
import IconPhone from "./icons/Phone.vue";
import IconLogo from "./icons/Logo.vue";
import IconMenu from "./icons/Menu.vue";
import AppSidebar from "./AppSidebar.vue";

const { breakpoints } = useBreakpoints();

const isNavbarOpen = ref(false);

const openNav = () => {
  if (breakpoints.smallerOrEqual("lg")) {
    isNavbarOpen.value = true;
  }
};

watchEffect(() => {
  if (breakpoints.greater("lg").value) {
    isNavbarOpen.value = false;
  }
});

const navLinks = [
  "Обо мне",
  "Наставничество",
  "Мероприятия",
  "Кейсы",
  "Отзывы",
  "Контакты",
];
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <h1 class="header__logo logo">
        <a
          class="logo__link"
          href="#"
          ><IconLogo class="logo__link-icon"
        /></a>
      </h1>
      <ul class="header__list">
        <li v-for="item in navLinks">
          <a
            class="header__link"
            href="#"
            >{{ item }}</a
          >
        </li>
      </ul>

      <div class="header__button-group">
        <button
          class="header__menu-button"
          @click="openNav"
        >
          <IconMenu />
        </button>
        <a
          class="header__number-link"
          href="tel:83451233445"
        >
          <span class="header__number-icon"><IconPhone /></span>
          <span class="header__number">8-345-123-34-45</span>
        </a>
      </div>

      <AppSidebar
        to="#modal"
        v-model="isNavbarOpen"
      >
        <nav class="sidebar-nav">
          <ul class="sidebar-nav__list">
            <li
              v-for="item in navLinks"
              class="sidebar-nav__list-item"
            >
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </nav>
      </AppSidebar>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use "../styles" as *;

.sidebar-nav {
  &__list {
    @include flex($direction: column, $align: center);
    gap: 20px;
    text-align: center;
  }
}

.header {
  padding-top: 40px;
  font-family: ff(montserrat);
  line-height: 1.2;

  &__nav {
    @include flex($justify: space-between, $align: center);
  }

  &__list {
    @include flex;

    gap: 30px;
    font-size: fs(sm);

    @include breakpoint(lg) {
      display: none;
    }
  }

  &__menu-button {
    display: none;

    width: 40px;
    height: 40px;
    padding: 9px;
    margin-right: 14.5px;
    border: 1px solid clr(text);
    border-radius: 50%;
    background-color: transparent;

    &:hover,
    &:focus {
      opacity: 0.6;
    }

    @include breakpoint(lg) {
      @include flex($justify: center, $align: center);
      margin-right: 10px;
    }
  }

  &__logo {
    margin-right: 35px;

    @include breakpoint(xl) {
      margin-right: 0;
    }
  }

  &__number {
    @include breakpoint(xl) {
      display: none;
    }
  }

  &__link {
    outline: none;
    &:hover,
    &:focus {
      opacity: 0.6;
    }
  }

  &__number-icon {
    @include flex($justify: center, $align: center);

    width: 40px;
    height: 40px;
    padding: 9px;
    margin-right: 14.5px;
    border: 1px solid clr(text);
    border-radius: 50%;

    @include breakpoint(lg) {
      margin-right: 0;
    }
  }

  &__number-link {
    @include flex($align: center);

    font-size: fs(lg);
    font-weight: fw(semibold);
    letter-spacing: 0.3px;
    outline: none;

    &:hover,
    &:focus {
      opacity: 0.6;
    }
  }

  &__button-group {
    @include flex;
  }
}

.logo {
  width: 168px;
  line-height: 0;

  @include breakpoint(md) {
    width: 32%;
  }

  &__link {
    display: inline-block;
    width: 100%;
    padding: 5px 0;
    border: 1px solid clr(text);
    border-left: none;
    border-right: none;
    outline: none;

    @include breakpoint(sm) {
      padding: 0;
    }
  }

  &__link-icon {
    width: 100%;
  }
}
</style>
