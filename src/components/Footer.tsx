import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bottom-0 flex flex-col w-full p-5 justify-center items-center space-y-1">
      <button className="link flex items-center gap-1 bg-transparent font-semibold">
        <FaArrowUp className="text-sm" />
        Back To Top
      </button>
      <span className="text-center">
        © 2025 Developed by{" "}
        <Link to={"https://pramodsoysaportfolio.netlify.app/"} className="link">
          Pramod Soysa
        </Link>{" "}
        - All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
