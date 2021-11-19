const useLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export default useLocalStorage;
