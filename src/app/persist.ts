import { Store } from "./store";

let storage = window.localStorage;

export const persistStore = (store: Store) => {
  storage.setItem('store', JSON.stringify(store));
}

export const rehydrateStore = () => {
  const store = storage.getItem('store');

  if (store) {
    return JSON.parse(store);
  } else {
    return null;
  }
}