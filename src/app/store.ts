import OptionState from "../types/Option";
import Pet, { PetMapping } from "../types/Pet";
import { ActionType } from "./actions";
import { persistStore } from "./persist";
import appReducer from "./reducer";

export type Store = {
  readonly petMapping: PetMapping | null;
  readonly preferenceMapping: Partial<PetMapping> | null;
  readonly settings: {
    sorting: {
      maintenance: OptionState;
      adaptability: OptionState;
    }
  };
}

let store: Store = {
  petMapping: null,
  preferenceMapping: null,
  settings: {
    sorting: {
      maintenance: null,
      adaptability: null
    }
  }
};

class RerenderEvent extends EventTarget {
  triggerRerender(store: Store) {
    this.dispatchEvent(new CustomEvent('rerender', { detail: store }));
  }
}

export const rerenderEvent = new RerenderEvent;

type Dispatch = (
  action: ActionType
) => Promise<Store>;

const dispatch: Dispatch = async (
  action,
) => {
  store = appReducer(store, action);
  persistStore(store);

  rerenderEvent.triggerRerender(store);

  return store;
};

export const useSelector = <T extends (arg0: Store) => any>(fn: T): ReturnType<T> => {
  return fn(store);
};

export default dispatch;
