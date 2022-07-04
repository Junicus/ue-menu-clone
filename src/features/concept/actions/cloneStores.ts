import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../../app/store";
import { getMenu, uploadMenu } from "../../../app/ueApi";

type CloneStoresError = { message: string };
type CloneStoresArgs = { conceptId: string; storeId: string };

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const cloneStores = createAsyncThunk<
  void,
  CloneStoresArgs,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: CloneStoresError;
  }
>(
  "concepts/cloneStores",
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const conceptSettings = state.settings.concepts[data.conceptId];
      const sourceStoreSettings = conceptSettings.stores[data.storeId];
      const destinationStores = Object.keys(conceptSettings.stores)
        .filter((storeKey) => storeKey !== sourceStoreSettings.id)
        .map((storeKey) => conceptSettings.stores[storeKey]);

      const menuConfiguration = await getMenu(
        sourceStoreSettings.uberId,
        state.settings.ueSettings.token
      );

      destinationStores.forEach(async (destinationStore) => {
        const storeMenu = await getMenu(
          destinationStore.uberId,
          state.settings.ueSettings.token
        );
        let updatedMenu = { ...menuConfiguration };
        updatedMenu.menus[0].service_availability = [
          ...storeMenu.menus[0].service_availability,
        ];
        uploadMenu(
          destinationStore.uberId,
          updatedMenu,
          state.settings.ueSettings.token
        );
        await delay(1500);
      });
    } catch (err) {
      return rejectWithValue({ message: "Error cloning stores" });
    }
  }
);
