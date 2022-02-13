import { Store } from "./store";

export const getSortingOptions = (state: Store) => state.settings.sorting;

export const getPreferenceMapping = (state: Store) => state.preferenceMapping;

export const getPetsMapping = (state: Store) => state.petMapping;