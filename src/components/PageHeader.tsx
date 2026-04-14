import { FaPlus } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
}

interface PageHeaderWithNewNavigation extends PageHeaderProps {
  newButtonPath: string;
  newButtonTitle?: string;
}

interface PageHeaderWithNewButton extends PageHeaderProps {
  onClick: ()=>void;
  newButtonTitle?: string;
}
interface PageHeaderWithBackButton extends PageHeaderProps {
  backPath: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <h1 className="text-xl font-semibold capitalize">
      {title}
    </h1>
  );
};

export const PageHeaderWithNewButton = (props: PageHeaderWithNewButton) => {
  const { title, onClick, newButtonTitle } = props;
  return (
    <div className="w-full gap-2 flex items-center xs:flex-row xs:items-center justify-between">
      <PageHeader title={title} />
      <button onClick={onClick} className="min-w-24 btn-primary py-2 px-3">
        <FaPlus className="text-xs" />
        {newButtonTitle ?? "New"}
      </button>
    </div>
  );
};

export const PageHeaderWithNewNavigation = (props: PageHeaderWithNewNavigation) => {
  const { title, newButtonPath, newButtonTitle } = props;
  return (
    <div className="w-full gap-2 flex items-center xs:flex-row xs:items-center justify-between">
      <PageHeader title={title} />
      <Link to={newButtonPath} className="min-w-24 btn-primary py-2 px-3">
        <FaPlus className="text-xs" />
        {newButtonTitle ?? "New"}
      </Link>
    </div>
  );
};

export const PageHeaderWithBackButton = (props: PageHeaderWithBackButton) => {
  const { title, backPath } = props;
  return (
    <div className="w-full gap-4 flex items-center">
      <Link
        to={backPath}
        className="border-2 p-2 rounded-lg border-border-primary transform duration-300 ease-in-out hover:bg-(--color-bg-bg-secondary)"
      >
        <FaChevronLeft />
      </Link>
      <PageHeader title={title} />
    </div>
  );
};
