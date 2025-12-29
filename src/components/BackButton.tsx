import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
interface NewButtonProps {
  path: string;
  title?: string;
}
const NewButton = ({ path, title = "New" }: NewButtonProps) => {
  return (
    <Link
      to={path}
      className="flex flex-row items-center gap-2 text-center  text-white px-4 py-1 rounded-lg transition-transform duration-1000 ease-in-out  cursor-pointer btn-primary-bg hover:bg-blue-700"
    >
      <FaPlus className="text-xs" />
      {title}
    </Link>
  );
};

export default NewButton;
