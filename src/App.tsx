import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Sidebar from "./app/components/layout/Sidebar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import SettingsPage from "./features/settings/SettingsPage";
import ConceptPage from "./features/concept/ConceptPage";
import Dashboard from "./app/components/layout/Dashboard";

function App() {
  useEffect(() => {
    invoke("show_window");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="concept/:id" element={<ConceptPage />} />
      </Route>
    </Routes>
  );
}

export default App;
