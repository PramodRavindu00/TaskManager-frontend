import PageHeader from "@/components/PageHeader";
import { Outlet } from "react-router-dom";

const TaskLayout = () => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <PageHeader
        title="Task"
        showNewButton={true}
        newButtonPath="/tasks/new"
        newButtonTitle="Create Task"
      />
      <Outlet />
    </div>
  );
};

export default TaskLayout;
