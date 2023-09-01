import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      // Realiza la llamada a la API de inicio de sesión
      const response = await fetch("https://auth.kostumes.store/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // Guarda el token recibido en el estado o en el almacenamiento local
        setIsAuthenticated(true);
        // Utiliza window.location.href para redirigir
        window.location.href = "/user-profile"; // O la ruta que desees
      } else {
        setError("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {[...Array(150)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-pulse bg-gray-300"
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="max-w-sm mx-auto p-6 bg-white  rounded shadow-md">
        <h2 className="text-2xl text-ft font-semibold mb-4">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button type="submit" className="bg-ft text-white p-2 rounded-md w-full">
            Iniciar sesión
          </button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/signup" className="text-blue-500">
            Regístrate aquí
          </Link>
        </p>
        <p className="mt-2 text-center text-gray-600">
          <Link to="/">Volver a la página principal</Link>
        </p>  
      </div>
      
    </div>
  );
};

export default LoginForm;
