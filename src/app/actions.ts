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
export type ActionType = ReturnType<
  typeof fetchDataList
  | typeof toggleSortOption
>;
