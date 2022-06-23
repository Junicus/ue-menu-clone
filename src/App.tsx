import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./features/home/HomePage";
import SettingsPage from "./features/settings/SettingsPage";
import ConceptPage from "./features/concept/ConceptPage";
import Dashboard from "./app/components/layout/Dashboard";
import GeneralSettingsTab from "./features/settings/components/GeneralSettingsTab";
import ConceptsSettingsTab from "./features/settings/components/ConceptsSettingsTab";
import NewConceptSettings from "./features/settings/components/NewConceptSettings";
import ConceptSettings from "./features/settings/components/ConceptSettings";
import NewStoreSettings from "./features/settings/components/NewStoreSettings";

function App() {
  useEffect(() => {
    invoke("show_window");
  }, []);

  const path = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />}>
          <Route index element={<Navigate to="/settings/general" replace />} />
          <Route path="general" element={<GeneralSettingsTab />} />
          <Route path="concepts" element={<Outlet />}>
            <Route index element={<ConceptsSettingsTab />} />
            <Route path="new_concept" element={<NewConceptSettings />} />
            <Route path="new_store" element={<NewStoreSettings />} />
            <Route path="concept/:id" element={<ConceptSettings />} />
          </Route>
        </Route>
        <Route path="concept/:id" element={<ConceptPage />} />
        <Route
          path="*"
          element={
            <main>
              <p>Not Found</p>
              <p>{path.pathname}</p>
              <Link to="/">Home</Link>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
