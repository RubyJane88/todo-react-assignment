/* simple localStorage usage */

export const store = (key: string, value: any) => {
  /* stringify it first */
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const get = (key: string) => {
  /* get data from localStorage */
  const value: string | null = window.localStorage.getItem(key);

  /* return null if empty data */
  if (!value) return null;

  /* parse the data from localStorage because the data is in string state */
  return JSON.parse(value);
};
