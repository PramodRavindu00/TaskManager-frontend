
import { PageHeaderWithNewButton } from "@/components/PageHeader";
import { useState } from "react";
import ProjectCreateForm from "./ProjectCreateForm";

const ProjectListView = () => {
  const [open,setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return <div className="col-page">
    <PageHeaderWithNewButton title="Project List" onClick={openModal} newButtonTitle="New Project"/>


    <ProjectCreateForm isOpen={open} closeModal={closeModal}/> 

  
  </div>;
};

export default ProjectListView;
