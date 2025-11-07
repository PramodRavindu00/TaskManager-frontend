import api from "@/apiService";
import {
  loginSchema,
  type LoginFormData,
} from "@/utils/formValidations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/auth/login", data);
      const token = res?.data?.accessToken;

      //set access token in the redux state
      dispatch(setAccessToken(token));
      reset();
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
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
              className={`form-input ${
                errors.email ? "form-input-error" : "form-input-focus"
              }`}
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
              className={`form-input ${
                errors.password ? "form-input-error" : "form-input-focus"
              }`}
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
