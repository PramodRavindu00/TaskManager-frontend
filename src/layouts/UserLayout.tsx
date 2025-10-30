import { Outlet } from "react-router-dom";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Appbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
