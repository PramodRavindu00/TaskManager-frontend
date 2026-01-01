import { PageHeaderWithNewButton } from "@/components/PageHeader";

const ProjectListView = () => {
  return <div className="col-page">
    <PageHeaderWithNewButton title="Project List" newButtonPath="/projects/new"/>
  </div>;
};

export default ProjectListView;
