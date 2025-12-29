import { FaPlus } from "react-icons/fa";

import { Link } from "react-router-dom";

interface PageHeaderBaseProps {
  title: string;
}
interface PageHeaderWithNewButton extends PageHeaderBaseProps {
  showNewButton: true;
  newButtonPath: string;
  newButtonTitle?: string;
}
interface PageHeaderWithoutNewButton extends PageHeaderBaseProps {
  showNewButton?: false;
}

type PageHeaderProps = PageHeaderWithNewButton | PageHeaderWithoutNewButton;
const PageHeader = (props: PageHeaderProps) => {
  const { title } = props;
  return (
    <div className="gap-2 py-2 flex flex-col items-start md:flex-row md:items-center md:justify-between">
      <h1 className="text-xl md:text-2xl font-semibold capitalize">{title}</h1>
      {props.showNewButton && (
        <Link
          to={props.newButtonPath}
          className="min-w-32 flex flex-row items-center justify-center gap-2   text-white px-4 py-2 rounded-xl transition-transform duration-1000 ease-in-out  cursor-pointer btn-primary-bg hover:bg-blue-700"
        >
          <FaPlus className="text-xs" />
          {props.newButtonTitle ?? "New"}
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
