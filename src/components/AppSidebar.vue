<script setup lang="ts">
import { TeleportProps, watchEffect } from "vue";
import { useScrollLock } from "@vueuse/core";
import IconCross from "./icons/Cross.vue";

const isLocked = useScrollLock(document.body);

const props = defineProps<{ to: TeleportProps["to"]; modelValue?: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const closeOnEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("update:modelValue", false);
  }
};

watchEffect(() => {
  if (props.modelValue) {
    isLocked.value = true;
    return window.addEventListener("keydown", closeOnEsc);
  }
  isLocked.value = false;
  window.removeEventListener("keydown", closeOnEsc);
});
</script>

<template>
  <Teleport :to>
    <Transition>
      <div
        v-if="modelValue"
        class="sidebar"
        @click="$emit(`update:modelValue`, false)"
      >
        <div
          class="sidebar__content"
          @click.stop
        >
          <button
            class="sidebar__close-button"
            @click="$emit(`update:modelValue`, false)"
          >
            <IconCross class="sidebar__close-icon" />
          </button>
          <div class="sidebar__body">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use "../styles/" as *;

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active .sidebar__content,
.v-leave-active .sidebar__content {
  transform: translateX(0);
}

.v-enter-from .sidebar__content,
.v-leave-to .sidebar__content {
  transform: translateX(-100%);
}

.sidebar {
  @extend .transition;
  @include flex;
  @include position(fixed, 0, 0, 0, 0, 999);
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;

  &__content {
    @extend .transition;
    @include flex($direction: column);
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    width: 612px;
    padding: 40px 50px 50px 75px;
    background-color: clr(popup);
  }

  &__close-button {
    margin-bottom: 37px;
    width: 30px;
    height: 30px;
    align-self: flex-end;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__close-icon {
    width: 100%;
    height: 100%;
  }

  &__body {
    // overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
  }
}

@media screen and (max-width: 997px) {
  .sidebar__content {
    width: 100%;
    padding: 40px 35px;
  }
  .sidebar__close-button {
    margin-bottom: 52px;
    width: 20px;
    height: 20px;
  }
}
</style>
