import type { UserRole } from "@/utils/constants/types";
import { getDefaultRouteForRole } from "@/utils/helpers/getDefaultRouteForRole";
import { selectLoggedUserRole } from "@/utils/redux/selectors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const loggedUserRole = useSelector(selectLoggedUserRole);
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(getDefaultRouteForRole(loggedUserRole as UserRole), {
      replace: true,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md flex flex-col items-center justify-center space-y-4">
        <h1 className="text-9xl font-bold ">403</h1>
        <p className="text-center font-bold">
          Sorry ! You don't have access to this page.
        </p>
        <button className="btn-primary" type="button" onClick={handleRedirect}>
          Go to Authorized Page
        </button>
      </div>
    </div>
  );
};

export default UnAuthorized;
