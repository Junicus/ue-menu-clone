import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteConcept } from "../settingsSlice";

export default function ConceptsSettingsTab() {
  const concepts = useAppSelector((state) =>
    Object.keys(state.settings.concepts)
      .sort((a, b) => a.localeCompare(b))
      .map((conceptKey) => ({
        id: conceptKey,
        name: state.settings.concepts[conceptKey].name,
        label: state.settings.concepts[conceptKey].label,
        stores: Object.keys(state.settings.concepts[conceptKey].stores).length,
      }))
  );

  const dispatch = useAppDispatch();

  const deleteConceptCallback = useCallback(
    (conceptId: string) => {
      dispatch(deleteConcept(conceptId));
    },
    [dispatch]
  );

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex">
        <h3 className="text-lg font-medium leading-6 texzt-gray-900">
          Concepts Settings
        </h3>
        <div className="flex flex-1 justify-end">
          <Link
            to="/settings/concepts/new_concept"
            className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </Link>
        </div>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {concepts.map((concept) => (
            <li key={concept.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {concept.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {concept.stores} Stores
                  </p>
                </div>
                <div>
                  <Link
                    to={`/settings/concepts/concept/${concept.id}`}
                    className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteConceptCallback(concept.id)}
                    className="ml-3 rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
