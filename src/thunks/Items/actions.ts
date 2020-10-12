import { ItemModel } from "models/ItemModel";

export function itemsHasErrored(bool: boolean) {
  return {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function itemsIsLoading(bool: boolean) {
  return {
      type: 'ITEMS_IS_LOADING',
      isLoading: bool
  };
}
export function itemsFetchDataSuccess(items: ItemModel[]) {
  return {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
      items
  };
}