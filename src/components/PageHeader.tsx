import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showNewButton?: boolean;
  newButtonPath?: string;
  newButtonTitle?: string;
}
const PageHeader = ({
  title,
  showNewButton = true,
  newButtonPath = "new",
  newButtonTitle = "New",
}: PageHeaderProps) => {
  return (
    <div className="w-full gap-2 py-2 flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-xl md:text-2xl font-semibold capitalize">{title}</h1>
      {showNewButton && <Link to={newButtonPath}>{newButtonTitle}</Link>}
    </div>
  );
};

export default PageHeader;
