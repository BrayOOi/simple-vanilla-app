import produce from 'immer';

import Pet from '../types/Pet';
import OptionState from "../types/Option";
import { ActionType } from "./actions";
import { Store } from "./store";
import { PetsMap } from "./utils";

const appReducer = (prevStore: Store, action: ActionType): Store => {
  switch (action.type) {
    case 'load/fetch_data_list':
      return produce(prevStore, draft => {
        draft.petMapping = PetsMap(action.payload)
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
    case 'drag/add_preference':
      const [typeString, breedOrSpecies] = action.payload.split('/');
      const type = typeString as Pet["type"];
      const pet = prevStore.petMapping![type].find(pet => pet?.breed === breedOrSpecies || pet?.species === breedOrSpecies);

      return produce(prevStore, draft => {
        draft.petMapping![type] = draft.petMapping![type].filter(pet => pet?.breed !== breedOrSpecies && pet?.species !== breedOrSpecies);
        
        if (!draft.preferenceMapping) {
          draft.preferenceMapping = {
            [type]: [pet]
          }
        } else if (!(type in draft.preferenceMapping)) {
          draft.preferenceMapping![type] = [pet!];
        } else {
          if (pet) {
            draft.preferenceMapping[type]!.push(pet);
          }
        }
      });
    default:
      return prevStore;
  }
};

export default appReducer;
