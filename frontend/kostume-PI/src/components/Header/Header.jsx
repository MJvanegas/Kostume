import "./Header.css";
import { Link } from "react-router-dom";
import logokoos from "../../assets/KustomeLogoBlanco 3.png";

const Header = ({ isAuthenticated }) => {
  return (
    <header className="z-20">
      <div className="header_logo">
        <Link to='/'><img src={logokoos} alt="koostume" />
          <span>Elige tu historia, viste tu Aventura</span></Link>
      </div>

      <div>
        {isAuthenticated ? (
          <Link to="/user-profile" className="header-button">
            Mi Perfil
          </Link>
        ) : (
          <>

            <Link to="/login" className="header-button">
              Iniciar Sesión
            </Link>
            <Link to="/crear-cuenta" className="header-button">
              Crear Cuenta
            </Link>

          </>
        )}
      </div>
    </header>
  );
};

export default Header;
