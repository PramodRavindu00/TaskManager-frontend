import type { SidebarItem } from "@/utils/constants/types";
import { useState } from "react";

export const SideBarItem = ({ item, open }: { item: SidebarItem; open: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="relative">
      <div
        className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center"
        onClick={() => setExpanded(!expanded)}
      >
        {item.icon}
        <span className={`${!open && "w-0 overflow-hidden"} duration-500`}>
          {item.label}
        </span>
        {item.children && open && (
          <span className="ml-auto">{expanded ? "▾" : "▸"}</span>
        )}
      </div>

      {/* Recursive rendering of children */}
      {item.children && expanded && (
        <ul className="ml-6 border-l border-blue-400">
          {item.children.map((child: any, idx: number) => (
            <SidebarItem key={idx} item={child} open={open} />
          ))}
        </ul>
      )}
    </li>
  );
};
