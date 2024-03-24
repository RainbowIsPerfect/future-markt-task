import { reactive, ref, watch } from "vue";
import * as v from "valibot";

export type UserFormData = {
  name: string;
  phone: string;
  agreed: boolean;
};

export type Errors = {
  [K in keyof UserFormData]?: string | undefined;
};

const STORAGE_KEY = "userData";
const initialData = {
  name: "",
  phone: "",
  agreed: false,
};
const schema = v.object({
  name: v.string([v.minLength(1, "Введите ваше имя")]),
  phone: v.string([v.regex(/^(\+7|8)9\d{9,9}$/, "Введите корректный номер")]),
  agreed: v.boolean([
    v.custom(
      (input) => input,
      "Вы должны согласиться на обработку персональных данных",
    ),
  ]),
});

const getFromStorage = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);

  return storedValue ? (JSON.parse(storedValue) as UserFormData) : initialData;
};

const userData = reactive(getFromStorage());
const errors = ref<Errors>({});
const isSubmitted = ref(false);

const clearForm = () => Object.assign(userData, initialData);

const handleSubmit = (cb: (values: UserFormData) => void) => {
  return () => {
    const result = v.safeParse(schema, userData);

    if (result.issues) {
      const flatErrors = v.flatten<typeof schema>(result.issues).nested;
      const currentErrors: Errors = {};
      for (const key in flatErrors) {
        currentErrors[key as keyof Errors] =
          flatErrors[key as keyof typeof flatErrors]?.[0];
      }

      errors.value = currentErrors;

      return;
    }

    errors.value = {};

    isSubmitted.value = true;

    return cb(userData);
  };
};

watch(userData, (value) => {
  localStorage.setItem("userData", JSON.stringify(value));
});

export const useFormValues = () => {
  return {
    userData,
    isSubmitted,
    errors,
    handleSubmit,
    clearForm,
  };
};
