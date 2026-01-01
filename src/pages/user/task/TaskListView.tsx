import { PageHeaderWithNewButton } from "@/components/PageHeader";

const TaskListView = () => {
  return <div className="col-page">
    <PageHeaderWithNewButton title="Task List" newButtonPath="/tasks/new"/>
  </div>;
};

export default TaskListView;
