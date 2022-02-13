import Pet from "../types/Pet";
import { Store } from "./store";

export const fetchDataList = (payload: Array<Pet>) => ({
  type: 'load/fetch_data_list' as const,
  payload
});

export const toggleSortOption = (payload: keyof Store["settings"]["sorting"]) => ({
  type: 'click/toggle_sort_option' as const,
  payload
});

export const addPreference = (payload: string) => ({
  type: 'drag/add_preference' as const,
  payload // eg dog/golden-retriever
});

export const removePreference = (payload: string) => ({
  type: 'drag/remove_preference' as const,
  payload // eg dog/golden-retriever
});

export const resetPreference = () => ({
  type: 'click/reset_preference' as const,
});

export type ActionType = ReturnType<
  typeof fetchDataList
  | typeof toggleSortOption
  | typeof addPreference
  | typeof resetPreference
  | typeof removePreference
>;
