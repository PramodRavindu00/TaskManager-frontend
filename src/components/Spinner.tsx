import { ClipLoader } from "react-spinners";
const Spinner = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  return (
    <div
      className={`w-full flex items-center justify-center ${
        fullScreen
          ? "h-screen bg-white backdrop-blur-sm fixed inset-0 z-50"
          : "absolute inset-0"
      }`}
    >
      <ClipLoader size={50} color="#3B82F6" speedMultiplier={0.9} />
    </div>
  );
};

export default Spinner;
