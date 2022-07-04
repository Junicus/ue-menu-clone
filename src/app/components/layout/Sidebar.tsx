import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";

export default function Sidebar() {
  const concepts = useAppSelector((state) =>
    Object.keys(state.settings.concepts)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => state.settings.concepts[key])
  );

  return (
    <div className="flex flex-col h-full col-span-3">
      <div className="flex flex-1 flex-col bg-indigo-500">
        <div className="flex items-center justify-center p-5">
          <h3 className="text-sm font-medium text-gray-300">UE Menu Clone</h3>
        </div>
        <div className="flex flex-col flex-grow">
          <nav className="flex flex-col flex-grow">
            {concepts.map((concept) => (
              <NavLink
                key={concept.id}
                to={`/concept/${concept.id}`}
                className={({ isActive }) =>
                  classNames(
                    "px-3 py-2 text-gray-300",
                    isActive ? "border-r-4 border-purple-500 bg-indigo-700" : ""
                  )
                }
              >
                {concept.label}
              </NavLink>
            ))}
          </nav>
          <nav className="flex flex-col">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                classNames(
                  "px-3 py-2 text-gray-300",
                  isActive ? "border-r-4 border-purple-500 bg-indigo-700" : ""
                )
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
