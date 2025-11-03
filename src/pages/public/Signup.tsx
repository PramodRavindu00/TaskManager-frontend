import {
  signUpSchema,
  type SignUpFormData,
} from "@/utils/formValidations/signUpSchema";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/apiService";

const Signup = () => {
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
      await api.post("/auth/signup", rest);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-xl">
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
                  errors.firstName ? "form-input-error" : "form-input-focus"
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
                  errors.lastName ? "form-input-error" : "form-input-focus"
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
              className={`form-input ${
                errors.email ? "form-input-error" : "form-input-focus"
              }`}
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
                  errors.password ? "form-input-error" : "form-input-focus"
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
                  errors.confirmPassword
                    ? "form-input-error"
                    : "form-input-focus"
                }`}
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
