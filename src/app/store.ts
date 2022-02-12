import Pet, { PetMapping } from "../types/Pet";
import { ActionType } from "./actions";
import appReducer from "./reducer";

export type Store = {
  readonly petMapping: PetMapping | null;
  readonly preferenceList: Array<Pet>;
  readonly settings: {
    adaptability: 'asc' | 'desc' | null;
    maintenance: 'asc' | 'desc' | null;
  };
}

let store: Store = {
  petMapping: null,
  preferenceList: [],
  settings: {
    adaptability: null,
    maintenance: null
  }
};

type Dispatch = (
  action: ActionType
) => Promise<Store>;

const dispatch: Dispatch = async (
  action,
) => {
  store = appReducer(store, action);

  return store;
};

export const useSelector = <T extends (arg0: Store) => any>(fn: T): ReturnType<T> => {
  return fn(store);
};

export default dispatch;
