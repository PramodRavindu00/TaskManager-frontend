import PageHeader from "@/components/PageHeader";
import { Outlet } from "react-router-dom";

const TaskLayout = () => {
  return (
    <div>
      <PageHeader title="Task" />
      <Outlet />
    </div>
  );
};

export default TaskLayout;
