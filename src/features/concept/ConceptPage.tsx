import classNames from "classnames";
import { ReactNode, useCallback } from "react";
import {
  HiChevronRight,
  HiHome,
  HiOutlinePause,
  HiOutlineDotsCircleHorizontal,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import selectConceptWithStores from "../settings/selectors/selectConceptWithStores";
import { cloneStores } from "./actions/cloneStores";
import { setSelectedStore } from "./conceptsSlice";

export default function ConceptPage() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const settings = useAppSelector(selectConceptWithStores(id));

  return (
    <div className="h-screen page-layout">
      <div className="py-5 border-b-2 border-gray-200">
        <div className="flex items-center ml-4">
          <Link to="/">
            <HiHome />
          </Link>
          <HiChevronRight />
          <div>Concept</div>
        </div>
      </div>
      <div className="bg-white pt-5 overflow-auto">
        <div className="max-2-7xl mx-auto sm:px-6 lg:px-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Concept: {settings.concept.name}
            </h3>
          </div>
          {settings.stores.length > 0 ? (
            <>
              <CloneStoreSourceSelector conceptId={id} />
              <ConceptsList
                conceptId={id}
                selectedStore={settings.selectedStore}
              />
            </>
          ) : (
            <div>No Stores</div>
          )}
        </div>
      </div>
    </div>
  );
}

const statusMap: Record<string, ReactNode> = {
  idle: <HiOutlinePause />,
  cloning: <HiOutlineDotsCircleHorizontal />,
  success: <HiOutlineCheckCircle />,
  failed: <HiOutlineExclamationCircle />,
};

function CloneStoreSourceSelector({ conceptId }: { conceptId: string }) {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => ({
    selectedStore: state.concepts[conceptId].selectedStore,
    conceptStatus: state.concepts[conceptId].status,
    stores: Object.keys(state.concepts[conceptId].stores)
      .sort((a, b) => a.localeCompare(b))
      .map((storeKeys) => ({
        id: state.concepts[conceptId].stores[storeKeys].id,
        name: state.concepts[conceptId].stores[storeKeys].name,
      })),
  }));

  const handleClone = useCallback(() => {
    dispatch(
      cloneStores({ conceptId: conceptId, storeId: settings.selectedStore })
    );
  }, [conceptId]);

  return (
    <div className="mt-3 flex items-center">
      <label>Source</label>
      <select
        className="ml-3 flex-grow pl-3 pr-10 text-base border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={settings.selectedStore}
        onChange={(e) =>
          dispatch(setSelectedStore({ conceptId, storeId: e.target.value }))
        }
      >
        {settings.stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={classNames(
          "ml-3 inline-flex items-center border border-gray-300 px-3 py-2 shadow-sm text-sm font-medium leading-4 rounded-md text-gray-700",
          settings.selectedStore === undefined ||
            settings.conceptStatus !== "idle"
            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
            : ""
        )}
        onClick={() => handleClone()}
        disabled={settings.conceptStatus !== "idle"}
      >
        Clone
      </button>
    </div>
  );
}

function ConceptsList({
  conceptId,
  selectedStore,
}: {
  conceptId: string;
  selectedStore: string;
}) {
  const stores = useAppSelector((state) =>
    Object.keys(state.concepts[conceptId].stores)
      .sort((a, b) => a.localeCompare(b))
      .map((storeKey) => state.concepts[conceptId].stores[storeKey])
  );
  return (
    <div className="mt-5 border-t border-gray-200">
      <ul className="divide-y divide-gray-200">
        {stores &&
          stores.map((store) => (
            <li key={store.id} className="py-4">
              <div className="flex justify-between">
                <p
                  className={classNames(
                    "text-sm font-medium",
                    selectedStore === store.id
                      ? "text-gray-400"
                      : "text-gray-900"
                  )}
                >
                  {store.name}
                </p>
                {selectedStore !== store.id && <p>{statusMap[store.status]}</p>}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
