import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";

export default function Sidebar() {
  const concepts = useAppSelector((state) =>
    Object.keys(state.settings.concepts).map(
      (key) => state.settings.concepts[key]
    )
  );

  return (
    <div className="flex flex-col h-full col-span-3">
      <div className="flex flex-1 flex-col bg-indigo-500">
        <div className="border-b border-red-300">
          <h1>UE Menu Clone</h1>
        </div>
        <div className="flex flex-col flex-grow">
          <nav className="flex flex-col flex-grow">
            {concepts.map((concept) => (
              <Link key={concept.id} to={`/concept/${concept.id}`}>
                {concept.label}
              </Link>
            ))}
          </nav>
          <nav className="border-t border-red-300">
            <Link to="/settings">Settings</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
