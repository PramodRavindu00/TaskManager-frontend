import {
  loginSchema,
  type LoginFormData,
} from "@/utils/formValidations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearAuth,
  refreshAccessToken,
  setAuthLoading,
  setAuthSuccess,
} from "@/utils/redux/authSlice";

import { handleApiError } from "@/utils/helpers/handleApiError";
import { authService } from "@/service/auth.service";
import FormComponent from "@/components/FormComponent";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      dispatch(setAuthLoading(true));

      const loginResponse = await authService.login(data);
      const token = loginResponse?.data?.accessToken;

      dispatch(refreshAccessToken(token));

      const userResponse = await authService.getLoggedUser();
      const user = userResponse?.data;

      dispatch(setAuthSuccess({ accessToken: token, user }));
      reset();
    } catch (error: unknown) {
      handleApiError(error);
      dispatch(clearAuth());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-secondary">
      <div className="shadow-lg rounded p-8 w-full max-w-md bg-bg-primary">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <FormComponent onSubmit={handleSubmit(onSubmit)}>
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
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className={`form-input ${errors.password && "form-input-error"}`}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          <button
            className="btn-primary w-full"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </FormComponent>
        <p className="mt-6 text-center text-text-secondary">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
