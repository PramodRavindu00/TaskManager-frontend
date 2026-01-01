import {  FaPlus } from "react-icons/fa";
import {  FaChevronLeft } from "react-icons/fa6";

import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
}
interface PageHeaderWithNewButton extends PageHeaderProps {
  newButtonPath: string;
  newButtonTitle?: string;
}
interface PageHeaderWithBackButton extends PageHeaderProps {
  backPath: string;
}


export const PageHeader = ({title}: PageHeaderProps) => {
  return (
      <h1 className="w-full text-xl md:text-2xl font-semibold capitalize">{title}</h1>
  );
};


export const PageHeaderWithNewButton = (props: PageHeaderWithNewButton) => {
  const { title,newButtonPath,newButtonTitle } = props;
  return (
    <div className="w-full gap-2 flex items-center xs:flex-row xs:items-center justify-between">
    <PageHeader title={title}/>
        <Link
          to={newButtonPath}
          className="min-w-32 btn-primary"
        >
          <FaPlus className="text-xs" />
          {newButtonTitle ?? "New"}
        </Link>
    </div>
  );
};

export const PageHeaderWithBackButton = (props: PageHeaderWithBackButton) => {
  const { title,backPath } = props;
  return (
    <div className="w-full gap-2 flex items-center">
          <Link
          to={backPath}
          className="border p-2 rounded-lg bg-secondary border-main hover:scale-110 transform duration-300 ease-in-out"
        >
          <FaChevronLeft className="text-xl text-secondary " />
        </Link>
    <PageHeader title={title}/>
       
    </div>
  );
};



