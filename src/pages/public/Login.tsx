import {
  loginSchema,
  type LoginFormData,
} from "@/utils/formValidations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAuth, setAccessToken, setAuthLoading, setAuthenticated } from "@/utils/redux/authSlice";
import { setUser } from "@/utils/redux/userSlice";
import { getDefaultRouteForRole } from "@/utils/helpers/getDefaultRouteForRole";
import { handleApiError } from "@/utils/helpers/handleApiError";
import { authService } from "@/service/auth.service";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

const onSubmit = async (data: LoginFormData) => {
  try {
    dispatch(setAuthLoading(true));
    
    const loginResponse = await authService.login(data);
    const token = loginResponse?.data?.accessToken;

    // Set access token in the redux state
    dispatch(setAccessToken(token));
    // Get logged user 
    const userResponse = await authService.getLoggedUser();
    const user = userResponse?.data;
    dispatch(setUser(user));
    dispatch(setAuthenticated(true));
    navigate(getDefaultRouteForRole(user?.role), { replace: true });
    reset();
  } catch (error: unknown) {
    handleApiError(error);
    dispatch(clearAuth());
  } finally {
    dispatch(setAuthLoading(false));
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-main">
      <div className="shadow-lg rounded p-8 w-full max-w-md bg-secondary">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="btn-primary w-full" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-secondary">
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
