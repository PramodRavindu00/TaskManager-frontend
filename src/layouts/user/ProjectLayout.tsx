import PageHeader from "@/components/PageHeader";
import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
  return (
    <div>
      <PageHeader title="Project" />
      <Outlet />
    </div>
  );
};

export default ProjectLayout;
