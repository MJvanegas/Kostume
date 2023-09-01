import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://api.kostumes.store/api/registro", {
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcml0b3BhdmEzMkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MjgzMzA2OH0.DfqwrdUzrKsuSrmbUPuXfvnDTXPAwyUSyHG_PuVfjwo'
          },
          validateStatus: status => status === 302 || (status >= 200 && status < 300) // Validar solo 302 y códigos de éxito
        });

        if (response.status === 302) {
          setUserData(response.data.data);

          // Puedes manejar la redirección aquí o hacer una nueva solicitud a la URL de redirección
        } else if (response.status >= 200 && response.status < 300) {
          setUserData(response.data);
        } else {
          console.error("Error al obtener los datos del usuario.");
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!userData) {
    return <p>No se pudieron obtener los datos del usuario.</p>;
  }

  // const initials = userData.firstName[0] + userData.lastName[0];
  const firstNameInitial = userData.firstName ? userData.firstName[0] : '';
  const lastNameInitial = userData.lastName ? userData.lastName[0] : '';
  const initials = firstNameInitial + lastNameInitial;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-ft rounded-full mx-auto mb-4 flex justify-center items-center text-white text-2xl font-semibold">
          {initials}
        </div>
        <h2 className="text-2xl font-semibold">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-gray-600 mb-4">{userData.email}</p>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Funcionalidades del usuario</h3>
          <ul className="text-gray-700">
            <li className="mb-2">Ver mis pedidos</li>
            <li className="mb-2">Editar perfil</li>
            <li className="mb-2">Cambiar contraseña</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
