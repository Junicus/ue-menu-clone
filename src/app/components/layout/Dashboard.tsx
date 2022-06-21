import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen bg-gray-100 grid grid-cols-12">
      <Sidebar />
      <div className="h-screen col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
