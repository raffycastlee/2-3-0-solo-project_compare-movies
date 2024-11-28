const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
  try {
    const fetch = JSON.parse(localStorage.getItem(key))
    return (fetch === null) ? null : fetch;
  } catch (err) {
    console.error('JSON parse error!', err);
    return null;
  }
}

export {
  setLocalStorageKey,
  getLocalStorageKey
}