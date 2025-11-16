import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md flex flex-col items-center justify-center space-y-4">
        <h1 className="text-9xl font-bold ">404</h1>
        <h1 className="font-bold ">Page Not Found!</h1>
        <button className="btn-primary" type="button" onClick={handleRedirect}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
