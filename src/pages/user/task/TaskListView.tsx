import { PageHeaderWithNewNavigation } from "@/components/PageHeader";

const TaskListView = () => {
  return <div className="col-page">
    <PageHeaderWithNewNavigation title="Task List" newButtonPath="/tasks/new"/>
  </div>;
};

export default TaskListView;
