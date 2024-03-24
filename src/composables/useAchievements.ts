import { computed, onMounted, ref } from "vue";

const productivity = ref(100);

const getSum = (num: number) =>
  String(num)
    .split("")
    .reduce((acc, curr) => acc + +curr, 0);

const technics = computed(() => {
  const d = new Date();

  const year = getSum(d.getFullYear());
  const month = getSum(d.getMonth() + 1);
  const day = getSum(d.getDate());

  return year + month + day;
});

export const useAchievements = () => {
  onMounted(async () => {
    try {
      const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = await res.json();
      productivity.value = Math.trunc(data?.Valute.GBP?.Value);
    } catch {}
  });
  
  return { productivity, technics };
};
