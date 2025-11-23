import { useState } from "react";
import type { SidebarItem } from "@/utils/constants/types";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";

const SideBarItem = ({
  item,
  onItemClick,
}: {
  item: SidebarItem;
  onItemClick: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    if (item.children) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="w-full">
      {/* Parent Row */}
      {item.children ? (
        <button
          onClick={handleToggle}
          className="flex w-full flex-row items-center justify-between gap-x-3 px-3 py-2 cursor-pointer rounded-2xl hover:bg-black/20 dark:hover:bg-black/50"
        >
          <span className="flex items-center gap-x-3">
            {item.icon && <item.icon />}
            {item.title}
          </span>

          <FaChevronDown
            className={`transition-transform duration-700 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      ) : (
        <Link
          to={item.path ?? "#"}
          key={item.title}
          onClick={onItemClick}
          className="flex flex-row items-center gap-x-3 px-3 py-2 cursor-pointer rounded-2xl hover:bg-black/20 dark:hover:bg-black/50"
        >
          {item.icon && <item.icon />}
          {item.title}
        </Link>
      )}

      <div
        className={`ml-5 mt-1 flex flex-col gap-1 transition-all duration-500 overflow-hidden
    ${
      open
        ? "max-h-40 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-2"
    }
  `}
      >
        {item.children?.map((child, index) => (
          <Link
            key={index}
            to={child.path ?? "#"}
            onClick={onItemClick}
            className="flex flex-row items-center gap-x-3 px-3 py-2 rounded-2xl cursor-pointer  hover:bg-black/20 dark:hover:bg-black/50"
          >
            {child.icon && <child.icon />}
            {child.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarItem;
