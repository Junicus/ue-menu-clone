import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../app/store";
import { initializeConcept } from "../../concept/conceptsSlice";
import { addStore, Store } from "../settingsSlice";

type AddStoreActionArgs = Omit<Required<Store>, "source"> & {
  conceptId: string;
};

export const addStoreAction = createAsyncThunk<
  void,
  AddStoreActionArgs,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "settings/addStoreAction",
  async ({ conceptId, id, name, uberId }, { dispatch, getState }) => {
    const state = getState();
    const stores = Object.keys(state.settings.concepts[conceptId].stores).map(
      (storeKey) => ({
        id: state.settings.concepts[conceptId].stores[storeKey].id,
        name: state.settings.concepts[conceptId].stores[storeKey].name,
      })
    );
    dispatch(addStore({ conceptId, id, name, uberId }));
    dispatch(
      initializeConcept({
        conceptId,
        selectedStore: state.settings.concepts[conceptId].source,
        stores: [...stores, { id, name }],
      })
    );
  }
);
