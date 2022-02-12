import { ActionType } from "./actions";
import { Store } from "./store";
import { getPetsMapping } from "./utils";

const appReducer = (prevStore: Store, action: ActionType): Store => {
  switch (action.type) {
    case 'load/fetch_data_list':
      return {
        ...prevStore,
        petMapping: getPetsMapping(action.payload),
      };
    default:
      return prevStore;
  }
};

export default appReducer;
