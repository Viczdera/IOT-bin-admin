export const addToLocalStorage = (key: any, value: any) => {
  if (typeof value !== "string") value = JSON.stringify(value);
  try {
    return localStorage.setItem(key, value);
  } catch (err) {
    //console.log(err);
  }
};

export const getFromLocalStorage = (key: any) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (e) {
    return null;
  }
};

export const removeFromLocalStorage = (key: any) => {
  localStorage.removeItem(key);
};

export const emptyLocalStorage = () => {
  return localStorage.clear();
};
