import { selectTheme } from "@/utils/redux/selectors";
import { toggleTheme } from "@/utils/redux/themeSlice";
import { FaBell, FaLightbulb, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Appbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(selectTheme);
  return (
    <header className="w-full flex space-x-5 justify-end items-center p-5">
      {mode && mode === "dark" ? (
        <FaLightbulb onClick={() => dispatch(toggleTheme())} />
      ) : (
        <FaMoon onClick={() => dispatch(toggleTheme())} />
      )}
      <FaBell className="text-lg" />
    </header>
  );
};

export default Appbar;
