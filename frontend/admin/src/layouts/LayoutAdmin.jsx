import { Outlet } from "react-router-dom";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-secondary-500 p-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutAdmin;
