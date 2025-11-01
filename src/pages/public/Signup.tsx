import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">SignUp</h1>
        <form className="space-y-5">
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="form-input"
              />
              <span className="form-error"></span>
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-input"
              />
              <span className="form-error"></span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" placeholder="Email" className="form-input" />
            <span className="form-error"></span>
          </div>
          <div className="form-group-row">
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
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input"
              />
              <span className="form-error"></span>
            </div>
          </div>

          <button className="btn-primary">Register</button>
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
