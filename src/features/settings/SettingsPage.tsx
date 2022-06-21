import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import GeneralSettingsTab from "./components/GeneralSettingsTab";
import ConceptsSettingsTab from "./components/ConceptsSettingsTab";

export default function SettingsPage() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <div>Settings Page</div>
      </div>
      <div>
        <Tab.Group>
          <Tab.List className="border-b border-gray-500">
            <Tab>General</Tab>
            <Tab>Concepts</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <GeneralSettingsTab />
            </Tab.Panel>
            <Tab.Panel>
              <ConceptsSettingsTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
