import { Link, useLocation } from "react-router-dom";
import logokoos from "../../img/KustomeLogoBlanco 3.png";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex flex-col bg-secondary-500 p-5">
      <div className="flex flex-row justify-between gap-3">
        <div className="bg-secondary-500 text-center">
          <Link to="http://127.0.0.1:5173/">
            <img src={logokoos} alt="logo-koostume" />
          </Link>
          <span className="text-primary-100 text-sm">
            Elige tu historia, viste tu Aventura
          </span>
        </div>
        <div className="">
          <FaUserCircle className="fill-primary-200 w-12 h-12" />
          <h3 className="text-primary-200">Bienvenido Juanito</h3>
        </div>
      </div>
      <nav className="mt-5 border-b-2 border-primary-500 z-0">
        <ul className="flex gap-10 py-2">
          <li>
            <Link
              to="/products"
              className={`text-white hover:text-primary-200 relative ${
                location.pathname === "/products"
                  ? "text-primary-200 border-b-[3px] border-primary-300 pb-2.5 z-10"
                  : ""
              }`}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className={`text-white hover:text-primary-200 relative ${
                location.pathname === "/categories"
                  ? "text-primary-200 border-b-[3px] border-primary-300 pb-2.5 z-10"
                  : ""
              }`}
            >
              Categorias
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`text-white hover:text-primary-200 relative ${
                location.pathname === "/users"
                  ? "text-primary-200 border-b-[3px] border-primary-300 pb-2.5 z-10"
                  : ""
              }`}
            >
              Usuarios
            </Link>
          </li>
          <li>
            <Link
              to="/references"
              className={`text-white hover:text-primary-200 relative ${
                location.pathname === "/references"
                  ? "text-primary-200 border-b-[3px] border-primary-300 pb-2.5 z-10"
                  : ""
              }`}
            >
              Referencias
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
