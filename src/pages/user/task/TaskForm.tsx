import FormComponent from "@/components/FormComponent";
import FormField from "@/components/FormField";
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
  return (
    <div className="col-page">
      <PageHeaderWithBackButton backPath="/tasks" title="Add or Edit" />
      <FormComponent onSubmit={() => console.log("")}>
        <FormField
          label="Title"
          name="title"
          placeholder="Title"
          register={register}
          render={({ name, placeholder, register, className }) => (
            <input
              type="text"
              {...register(name)}
              placeholder={placeholder}
              className={className}
            />
          )}
          error={errors?.title?.message}
        />
        <FormField
          label="Description"
          name="description"
          placeholder="Description"
          register={register}
          render={({ name, placeholder, register, className }) => (
            <textarea
              {...register(name)}
              placeholder={placeholder}
              className={className}
            />
          )}
          error={errors?.description?.message}
        />
        <button
          className="btn-primary w-full"
          type="submit"
          disabled={isSubmitting}
        >
          Save
        </button>
      </FormComponent>
    </div>
  );
};

export default TaskForm;
