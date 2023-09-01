import logokoos from "/src/img/KustomeLogoBlanco 3.png";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary-200 h-24 flex justify-between px-8 py-6">
      <div className="grid grid-flow-col gap-4 items-center">
        <img className="" src={logokoos} alt="logo-koostume" />
        <div className="">
          <h6 className=" text-white text-sm top-px">Copyright © 2023 Koostume</h6>
        </div>
      </div>

      <div className=" grid grid-flow-col justify-stretchgrid table-fixed gap-8 items-center">
        <FaFacebook className="fill-white w-9 h-9" />
        <FaTwitter className="fill-white w-9 h-9" />
        <FaInstagram className="fill-white w-9 h-9" />
        <FaTiktok className="fill-white w-9 h-9" />
      </div>
    </footer>
  );
};

export default Footer;
