import Pet from "../types/Pet";

export const fetchDataList = (payload: Array<Pet>) => ({
  type: 'load/fetch_data_list' as const,
  payload
});

export type ActionType = ReturnType<
  typeof fetchDataList
>;
