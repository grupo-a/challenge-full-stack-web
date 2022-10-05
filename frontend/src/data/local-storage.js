export const setValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const getValue = (key) => {
  return localStorage.getItem(key);
};
