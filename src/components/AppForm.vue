<script setup lang="ts">
import { useFormValues } from "../composables/useFormValues";
import BaseInput from "./base/Input.vue";
import BaseCheckbox from "./base/Checkbox.vue";
import ArrowIcon from "./icons/Arrow.vue";

const { userData, errors, handleSubmit, clearForm } = useFormValues();

const onSubmit = handleSubmit(() => clearForm());
</script>

<template>
  <div class="form">
    <p class="form__heading">
      Закажите <br />
      обратный звонок
    </p>
    <form @submit.prevent="onSubmit">
      <div class="form__input-group">
        <BaseInput
          v-model="userData.name"
          placeholder="Имя"
          type="text"
          id="name"
          class="form__input"
        />
        <p
          v-if="errors.name"
          class="form__error"
        >
          {{ errors.name }}
        </p>
      </div>

      <div class="form__input-group">
        <BaseInput
          v-model="userData.phone"
          type="tel"
          placeholder="Телефон"
          class="form__input"
        />
        <p
          v-if="errors.phone"
          class="form__error"
        >
          {{ errors.phone }}
        </p>
      </div>

      <div class="form__checkbox">
        <BaseCheckbox
          v-model="userData.agreed"
          class="form__input"
          >Согласен на сохранение и обработку персональных данных</BaseCheckbox
        >
        <p
          v-if="errors.agreed"
          class="form__error"
        >
          {{ errors.agreed }}
        </p>
      </div>

      <button
        class="form__button button button--transparent"
        type="submit"
      >
        Заказать обратный звонок
        <span class="form__button-icon-wrapper">
          <ArrowIcon class="form__button-icon" />
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "../styles" as *;

.form {
  &__heading {
    margin-bottom: 60px;
    padding-left: 15px;
    font-size: fs(3xl);
    font-weight: fw(semibold);
    line-height: 1.48;
    letter-spacing: 0;
  }

  &__input-group {
    margin-bottom: 60px;
    font-size: fs(xl);
    &:nth-child(2) {
      margin-bottom: 110px;
    }
  }

  &__input {
    margin-bottom: 10px;
    font-family: ff(montserrat);

    font-size: fs(s);
    font-weight: fw(regular);
  }

  &__button {
    width: 100%;
    padding: 24px 80px 24px 24px;

    font-size: fs(lg);
    font-family: ff(montserrat);
    font-weight: fw(semibold);
    line-height: 1.2;

    @include breakpoint(sm) {
      font-size: fs(xs);
    }
  }

  &__button-icon-wrapper {
    @include position(absolute, $right: 0, $bottom: 0);
    @include flex($justify: flex-end, $align: flex-end);

    padding: 13px;
    height: 100%;
    width: 70px;
    border-left: 2px solid currentColor;

    @include breakpoint(sm) {
      padding: 8px;
      width: 44px;
    }
  }

  &__button-icon {
    @include breakpoint(sm) {
      width: 13px;
      height: 13px;
    }
  }

  &__checkbox {
    letter-spacing: 0.5px;
    line-height: 1.2;
    margin-bottom: 90px;
  }

  &__error {
    font-size: fs(sm);
  }
}

@media screen and (max-width: 997px) {
  .form__heading {
    padding: 0;
  }
}

@media screen and (max-width: 576px) {
  .form__heading {
    font-size: fs(xl);
    padding: 0;
  }
  .form__input-group {
    font-size: fs(xs);
    margin-bottom: 44px;

    &:nth-child(2) {
      margin-bottom: 30px;
    }
  }
  .form__checkbox {
    margin-bottom: 55px;
    font-size: fs(xs);
  }
  .form__button {
    width: 100%;
    padding: 15px 15px 15px 11px;
  }
}
</style>
