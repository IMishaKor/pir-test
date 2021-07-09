export const fakeFetch = <T>(callback: any): Promise<T> => {
  const data = callback();
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};
