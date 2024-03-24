export const useStorage = <T>(key: string, initialValue: T) => {
  const get = () => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? (JSON.parse(storedItem) as T) : null;
  };

  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { get, set };
};
