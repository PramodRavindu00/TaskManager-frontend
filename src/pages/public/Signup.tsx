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
    <div className="flex items-center justify-center min-h-screen bg-main">
      <div className="bg-secondary shadow-lg rounded p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">SignUp</h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="First Name"
                className={`form-input ${
                  errors.firstName && "form-input-error"
                }`}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name"
                className={`form-input ${
                  errors.lastName && "form-input-error"
                }`}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`form-input ${errors.email && "form-input-error"}`}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className={`form-input ${
                  errors.password && "form-input-error"
                }`}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className={`form-input ${
                  errors.confirmPassword && "form-input-error"
                }`}
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-secondary">
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
