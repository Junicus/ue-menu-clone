import { RootState } from "../../../app/store";

export default function selectConceptWithStores(id: string) {
  return (state: RootState) => {
    return {
      concept: state.settings.concepts[id],
      selectedStore: state.concepts[id].selectedStore,
      stores: Object.keys(state.settings.concepts[id].stores).map(
        (storeKey) => state.settings.concepts[id].stores[storeKey]
      ),
    };
  };
}
