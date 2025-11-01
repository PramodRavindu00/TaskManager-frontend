import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-5">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" placeholder="Email" className="form-input" />
            <span className="form-error"></span>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
            <span className="form-error"></span>
          </div>
          <button className="btn-primary">Login</button>
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
