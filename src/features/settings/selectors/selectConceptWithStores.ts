import { RootState } from "../../../app/store";

export default function selectConceptWithStores(id: string) {
  return (state: RootState) => {
    return {
      concept: state.settings.concepts[id],
      stores: Object.keys(state.settings.concepts[id].stores).map(
        (storeKey) => state.settings.concepts[id].stores[storeKey]
      ),
    };
  };
}
