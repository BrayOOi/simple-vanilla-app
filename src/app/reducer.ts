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
      return produce(prevStore, draft => {
        const [typeString, breedOrSpecies] = action.payload.split('/');
        const type = typeString as Pet["type"];
        const pet = prevStore.petMapping![type].find(pet => pet?.breed === breedOrSpecies || pet?.species === breedOrSpecies);

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
    case 'drag/remove_preference':
      return produce(prevStore, draft => {
        const [typeString, breedOrSpecies] = action.payload.split('/');
        const type = typeString as Pet["type"];
        const pet = prevStore.preferenceMapping![type]!.find(pet => pet?.breed === breedOrSpecies || pet?.species === breedOrSpecies);

        draft.preferenceMapping![type] = draft.preferenceMapping![type]?.filter(pet => pet?.breed !== breedOrSpecies && pet?.species !== breedOrSpecies);

        if (!draft.preferenceMapping![type]!.length) {
          delete draft.preferenceMapping![type];
        }

        if (!Object.keys(draft.preferenceMapping!).length) {
          draft.preferenceMapping = null;
        }

        if (pet) {
          draft.petMapping![type].push(pet);
        }
      });
    case 'click/reset_preference':
      return produce(prevStore, draft => {
        Object.entries(prevStore.preferenceMapping!).forEach(([typeString, pets]) => {
          const type = typeString as Pet["type"];

          draft.petMapping![type] = [...draft.petMapping![type], ...pets];
        });

        draft.preferenceMapping = null;
      });
    default:
      return prevStore;
  }
};

export default appReducer;
