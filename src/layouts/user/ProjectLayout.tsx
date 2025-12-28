import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
  return (
    <div>
      <h1>Project</h1>
      <Outlet />
    </div>
  );
};

export default ProjectLayout;
