import { selectLoggedUser } from "@/utils/redux/selectors";
import { FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const user = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };
  return (
    <header className="w-full flex space-x-5 justify-end items-start p-5">
      <FaBell className="text-lg" />
      <div className="flex flex-col items-end">
        <FaUser onClick={goToProfile} />
      </div>
    </header>
  );
};

export default Appbar;
