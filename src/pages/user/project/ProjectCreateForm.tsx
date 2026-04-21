import Modal from "@/components/ModalComponent";
import {
  projectSchema,
  type ProjectFormData,
} from "@/utils/formValidations/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/service/project.service";
import { toast } from "sonner";
import FormField from "@/components/FormField";

const ProjectCreateForm = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const createMutation = useMutation({
    mutationFn: (data: ProjectFormData) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project Created uccessfully");
      reset();
      closeModal();
    },
    onError: (error) => {
      toast.error("Failed to create project");
      console.error(error);
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset();
        closeModal();
      }}
      title="Create New Project"
    >
      <form
        className="col-page"
        onSubmit={handleSubmit((data) => createMutation.mutateAsync(data))}
      >
        <FormField
          label="Name"
          name="name"
          placeholder="Name"
          register={register}
          render={({ name, placeholder, register, className }) => (
            <input
              type="text"
              {...register(name)}
              placeholder={placeholder}
              className={className}
            />
          )}
          error={errors?.name?.message}
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
          disabled={createMutation.isPending}
        >
          Create Project
        </button>
      </form>
    </Modal>
  );
};

export default ProjectCreateForm;
