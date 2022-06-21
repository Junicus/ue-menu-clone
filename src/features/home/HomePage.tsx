import { useAppSelector } from "../../app/hooks";

export default function HomePage() {
  const appState = useAppSelector((state) => state);
  return (
    <div className="h-screen flex flex-col">
      <div>Home Page</div>
      <div className="flex-grow">
        <pre className="h-full overflow-auto">
          <code>{JSON.stringify(appState, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
