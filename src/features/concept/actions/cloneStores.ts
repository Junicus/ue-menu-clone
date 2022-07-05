import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../../../app/store";
import { getMenu, uploadMenu } from "../../../app/ueApi";
import { setStoreStatus } from "../conceptsSlice";

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
    const state = getState();
    const conceptSettings = state.settings.concepts[data.conceptId];
    const sourceStoreSettings = conceptSettings.stores[data.storeId];
    const destinationStores = Object.keys(conceptSettings.stores)
      .filter((storeKey) => storeKey !== sourceStoreSettings.id)
      .map((storeKey) => conceptSettings.stores[storeKey]);
    try {
      const menuConfiguration = await getMenu(
        sourceStoreSettings.uberId,
        state.settings.ueSettings.token
      );

      for (let i = 0; i < destinationStores.length; i++) {
        dispatch(
          setStoreStatus({
            conceptId: conceptSettings.id,
            storeId: destinationStores[i].id,
            status: "cloning",
          })
        );
        const storeMenu = await getMenu(
          destinationStores[i].uberId,
          state.settings.ueSettings.token
        );
        let updatedMenu = { ...menuConfiguration };
        updatedMenu.menus[0].service_availability = [
          ...storeMenu.menus[0].service_availability,
        ];
        try {
          await uploadMenu(
            destinationStores[i].uberId,
            updatedMenu,
            state.settings.ueSettings.token
          );
          dispatch(
            setStoreStatus({
              conceptId: conceptSettings.id,
              storeId: destinationStores[i].id,
              status: "success",
            })
          );
        } catch (err2) {
          dispatch(
            setStoreStatus({
              conceptId: conceptSettings.id,
              storeId: destinationStores[i].id,
              status: "failed",
            })
          );
        }
      }
    } catch (err) {
      return rejectWithValue({ message: "Error cloning stores" });
    }
  }
);
