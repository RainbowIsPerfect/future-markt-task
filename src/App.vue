<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
</script>

<template>
  <div class="wrapper">
    <AppHeader class="header" />
    <AppMain />
  </div>
</template>

<style scoped lang="scss">
@use "./styles" as *;

.header {
  margin-bottom: 178px;

  @include breakpoint(lg) {
    margin-bottom: 85px;
  }

  @include breakpoint(sm) {
    margin-bottom: 65px;
  }
}

.wrapper {
  width: 1320px;
  margin: 0 15px;
  border-left: 1px solid clr(border);
  border-right: 1px solid clr(border);
  position: relative;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 32%;
    top: 0;
    width: 1px;
    min-height: 100%;
    background-color: clr(border);
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    right: 34%;
    top: 0;
    width: 1px;
    min-height: 100%;
    background-color: clr(border);
  }
}
</style>

