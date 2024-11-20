const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (key) => {
  try {
    const fetch = JSON.parse(localStorage.getItem(key))
    return (fetch.length === 0) ? null : fetch;
  } catch (err) {
    console.error('JSON parse error!', err);
    return null;
  }
}

export {
  setLocalStorageKey,
  getLocalStorage
}