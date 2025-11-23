import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bottom-0 flex flex-col w-full p-5 justify-center items-center space-y-1 bg-secondary">
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
