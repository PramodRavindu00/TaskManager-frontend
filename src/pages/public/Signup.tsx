import {
  signUpSchema,
  type SignUpFormData,
} from "@/utils/formValidations/signUpSchema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/utils/axios/apiUtil";
import { handleApiError } from "@/utils/helpers/handleApiError";
import { toast } from "sonner";
import FormComponent from "@/components/FormComponent";
import FormField from "@/components/FormField";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const onSubmit = async (data: SignUpFormData) => {
    //eslint-disable-next-line
    const { confirmPassword, ...rest } = data;
    try {
      await api.post("/auth/signup", rest, { public: true });
      reset();
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error: unknown) {
      handleApiError(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-secondary">
      <div className="bg-bg-primary shadow-lg rounded p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">SignUp</h1>
        <FormComponent onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-row">
            <FormField
              label="First Name"
              name="firstName"
              placeholder="First Name"
              register={register}
              render={({ name, placeholder, register, className }) => (
                <input
                  type="text"
                  {...register(name)}
                  placeholder={placeholder}
                  className={className}
                />
              )}
              error={errors?.firstName?.message}
            />
            <FormField
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              register={register}
              render={({ name, placeholder, register, className }) => (
                <input
                  type="text"
                  {...register(name)}
                  placeholder={placeholder}
                  className={className}
                />
              )}
              error={errors?.lastName?.message}
            />
          </div>
          <FormField
            label="Email"
            name="email"
            placeholder="Email"
            register={register}
            render={({ name, placeholder, register, className }) => (
              <input
                type="email"
                {...register(name)}
                placeholder={placeholder}
                className={className}
              />
            )}
            error={errors?.email?.message}
          />
          <div className="form-group-row">
            <FormField
              label="Password"
              name="password"
              placeholder="Password"
              register={register}
              render={({ name, placeholder, register, className }) => (
                <input
                  type="password"
                  {...register(name)}
                  placeholder={placeholder}
                  className={className}
                />
              )}
              error={errors?.password?.message}
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              register={register}
              render={({ name, placeholder, register, className }) => (
                <input
                  type="password"
                  {...register(name)}
                  placeholder={placeholder}
                  className={className}
                />
              )}
              error={errors?.confirmPassword?.message}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting}
          >
            Register
          </button>
        </FormComponent>
        <p className="mt-6 text-center text-text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
