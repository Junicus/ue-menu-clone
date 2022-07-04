import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setSelectedStore } from "../../concept/conceptsSlice";
import { updateConceptDefaultStore } from "../settingsSlice";

export default function ConceptSettings() {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const concept = useAppSelector(
    (state) => state.settings.concepts[params.id || ""]
  );
  const storeKeys = Object.keys(concept.stores).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 row-auto">
      <div className="flex">
        <h3 className="text-lg font-medium leading-6 texzt-gray-900">
          Concept: {concept.name}
        </h3>
        <div className="flex flex-1 justify-end">
          <Link
            to="/settings/concepts/new_store"
            state={{ conceptId: concept.id }}
            className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </Link>
        </div>
      </div>
      <div className="mt-5 border-t border-gray-200 overflow-auto">
        <ul role="list" className="divide-y divide-gray-200">
          {storeKeys.map((storeKey) => (
            <li key={concept.stores[storeKey].id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {concept.stores[storeKey].name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    UberEats ID: {concept.stores[storeKey].uberId}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/settings/concepts/edit_store`}
                    state={{ conceptId: concept.id, storeId: storeKey }}
                    className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </Link>
                  {concept.source !== concept.stores[storeKey].id && (
                    <button
                      className="ml-3 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        dispatch(
                          updateConceptDefaultStore({
                            conceptId: concept.id,
                            storeId: storeKey,
                          })
                        );
                        dispatch(
                          setSelectedStore({
                            conceptId: concept.id,
                            storeId: storeKey,
                          })
                        );
                      }}
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
