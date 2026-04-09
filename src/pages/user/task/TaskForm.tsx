import FormComponent from "@/components/FormComponent";
import { PageHeaderWithBackButton } from "@/components/PageHeader";
import { taskSchema } from "@/utils/formValidations/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });
  return <div className="col-page">
    <PageHeaderWithBackButton backPath="/tasks" title="Add or Edit"/>
  
    <FormComponent onSubmit={()=>console.log("")}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Title"
              className={`form-input ${errors.title && "form-input-error"}`}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Description"
              className={`form-input ${errors.description && "form-input-error"}`}
            />
            {errors.description && (
              <p className="form-error">{errors.description.message}</p>
            )}
          </div>
          <button
            className="btn-primary w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </button>
        </FormComponent>
  </div>;
};

export default TaskForm;
