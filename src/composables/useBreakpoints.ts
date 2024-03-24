import { useBreakpoints as useBP } from "@vueuse/core";

export const useBreakpoints = () => {
  const breakpoints = useBP({
    sm: 576,
    md: 768,
    lg: 997,
    xl: 1200,
  });
  return { breakpoints };
};
