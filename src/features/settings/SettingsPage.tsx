import { Link, NavLink, Outlet } from "react-router-dom";
import { HiChevronRight, HiHome } from "react-icons/hi";

export default function SettingsPage() {
  return (
    <div className="h-screen page-layout">
      <div className="pt-5 row-auto">
        <div className="flex items-center ml-4">
          <Link to="/">
            <HiHome />
          </Link>
          <HiChevronRight />
          <div>Settings</div>
        </div>
        <div className="mt-5">
          <ul className="border-b-2 border-gray-200 flex space-x-5">
            <li className="ml-4">
              <NavLink
                to="/settings/general"
                className={({ isActive }) =>
                  isActive ? "border-b border-indigo-500" : ""
                }
              >
                General
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/concepts"
                className={({ isActive }) =>
                  isActive ? "border-b border-indigo-500" : ""
                }
              >
                Concepts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white pt-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
