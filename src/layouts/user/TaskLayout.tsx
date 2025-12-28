import { Outlet } from "react-router-dom";

const TaskLayout = () => {
  return (
    <div>
      <h1>Tasks</h1>
      <Outlet />
    </div>
  );
};

export default TaskLayout;
