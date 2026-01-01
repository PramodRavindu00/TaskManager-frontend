import { PageHeaderWithBackButton } from "@/components/PageHeader";

const TaskForm = () => {
  return <div className="col-page">
    <PageHeaderWithBackButton backPath="/tasks" title="Add or Edit"/>
  </div>;
};

export default TaskForm;
