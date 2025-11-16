import { FaBell } from "react-icons/fa";

const Appbar = () => {
  return (
    <header className="w-full flex space-x-5 justify-end items-center p-5">
      <FaBell className="text-lg" />
    </header>
  );
};

export default Appbar;
