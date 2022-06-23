import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
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

import { CloningStore, initializeConcept } from "./conceptsSlice";

export default function ConceptPage() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectConceptWithStores(id));
  const [selectedStore, setSelectedStore] = useState(settings.concept.source);

  useEffect(() => {
    dispatch(
      initializeConcept({
        conceptId: id,
        stores: Object.keys(settings.concept.stores).map((storeKey) => ({
          id: settings.concept.stores[storeKey].id,
          name: settings.concept.stores[storeKey].name,
        })),
      })
    );
  }, [dispatch, id]);

  const stores = useAppSelector((state) =>
    Object.keys(state.concepts[id].stores).map(
      (storeKey) => state.concepts[id].stores[storeKey]
    )
  );

  console.log(stores);

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
            <div className="mt-3 flex items-center">
              <label>Source</label>
              <select
                className="ml-3 flex-grow pl-3 pr-10 text-base border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                {settings.stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <button className="ml-3 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clone
              </button>
            </div>
          </div>
          <ConceptsList stores={stores} sourceId={selectedStore} />
        </div>
      </div>
    </div>
  );
}

const statusMap: Record<string, ReactNode> = {
  idle: <HiOutlinePause />,
};

function ConceptsList(props: { stores: CloningStore[]; sourceId?: string }) {
  return (
    <div className="mt-5 border-t border-gray-200">
      <ul className="divide-y divide-gray-200">
        {props.stores.map((store) => (
          <li key={store.id} className="py-4">
            <div className="flex justify-between">
              <p
                className={classNames(
                  "text-sm font-medium",
                  props.sourceId === store.id
                    ? "text-gray-400"
                    : "text-gray-900"
                )}
              >
                {store.name}
              </p>
              <p>{statusMap[store.status]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
