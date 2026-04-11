import Modal from "@/components/ModalComponent";
import { projectSchema, type ProjectFormData } from "@/utils/formValidations/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/service/project.service";
import { toast } from "sonner";

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
    formState: { errors},
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const createMutation = useMutation({
    mutationFn:(data:ProjectFormData)=>projectService.create(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['projects']});
      toast.success("project created successfully");
      reset()
      closeModal();
    },
    onError : (error)=>{
      toast.error("Failed to create project");
      console.error(error)
    }
  })

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset();
        closeModal();
      }}
      title="Create New Project"
    >
      <form className="col-page" onSubmit={handleSubmit((data)=>createMutation.mutateAsync(data))}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className={`form-input ${errors.name && "form-input-error"}`}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
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
          disabled={createMutation.isPending}
        >
          Create Project
        </button>
      </form>
    </Modal>
  );
};

export default ProjectCreateForm;
