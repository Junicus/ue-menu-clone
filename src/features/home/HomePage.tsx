import { useAppSelector } from "../../app/hooks";

export default function HomePage() {
  const appState = useAppSelector((state) => state);
  return (
    <div className="h-screen grid">
      <div>Home Page</div>
      <div className="overflow-auto">
        <pre className="h-full">
          <code>{JSON.stringify(appState, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
