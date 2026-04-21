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
import FormField from "@/components/FormField";
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
