import produce from 'immer';

import OptionState from "../types/Option";
import { ActionType } from "./actions";
import { Store } from "./store";
import { getPetsMapping } from "./utils";

const appReducer = (prevStore: Store, action: ActionType): Store => {
  switch (action.type) {
    case 'load/fetch_data_list':
      return produce(prevStore, draft => {
        draft.petMapping = getPetsMapping(action.payload)
      });
    case 'click/toggle_sort_option':
      let nextState: OptionState;

      switch (prevStore.settings.sorting[action.payload]) {
        case 'asc':
          nextState = 'desc';
          break;
        case 'desc':
          nextState = null;
          break;
        default:
          nextState = 'asc';
      }

      return produce(prevStore, draft => {
        draft.settings.sorting[action.payload] = nextState;
      });
    default:
      return prevStore;
  }
};

export default appReducer;
