import React, { useEffect, useState } from 'react'
import axios from "axios";
import './CrearReferencia.css'
import Modal from 'react-modal';
import { Link } from "react-router-dom";

const CrearReferencia = () => {
  const [referencia, setReferencia] = useState({
    nombreReferencia: "",
    descripcion: "",
    idCategorias: [],
    idSCaracteristicas: []
  });

  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [referenciaId, setReferenciaId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [referenceSaved, setReferenceSaved] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [uploadButtonEnabled, setUploadButtonEnabled] = useState(false);
  const [maxImageWarning, setMaxImageWarning] = useState("");



  useEffect(() => {
    // Obtener categorías de la API
    fetch('https://api.kostumes.store/api/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data.data))
      .catch(error => console.error('Error fetching categorías:', error));

    // Obtener características de la API
    fetch('https://api.kostumes.store/api/caracteristicas')
      .then(response => response.json())
      .then(data => setCaracteristicas(data.data))
      .catch(error => console.error('Error fetching características:', error));
  }, []);

  const handleCategoriaChange = event => {
    const selectedCategorias = Array.from(event.target.selectedOptions, option => option.value);
    setReferencia(prevState => ({
      ...prevState,
      idCategorias: selectedCategorias.slice(0, 2)
    }));
  };

  const handleCaracteristicaChange = event => {
    const selectedCaracteristicas = Array.from(event.target.selectedOptions, option => option.value);
    setReferencia(prevState => ({
      ...prevState,
      idSCaracteristicas: selectedCaracteristicas.slice(0, 10)
    }));
  };

  const resetForm = () => {
    setReferencia({
      nombreReferencia: "",
      descripcion: "",
      idCategorias: [],
      idSCaracteristicas: []
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    // Realizar la solicitud POST a la API con el contenido de 'referencia'
    fetch('https://api.kostumes.store/api/referencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(referencia)
    })
      .then(response => response.json())
      .then(data => {
        // Hacer algo con la respuesta de la API si es necesario
        console.log('Respuesta de la API:', data);
        if (data.message === 'Referencia creada exitosamente') {
          // Mensaje de usuario ya registrado
          setModalMessage('Información guardada exitosamente, debes cargar las fotos para continuar')
          setModalIsOpen(true);
          setReferenciaId(data.data.id);
          setReferenceSaved(true);

        } else if (data.message === 'Revisa los datos para crear la referencia, se han encontrado errores') {
          // Mensaje de usuario creado exitosamente
          setModalMessage(data.data[0])
          setModalIsOpen(true);
          resetForm();
          // alert(data.data[0]);
        }
        console.log('esto muestra el modalMessage', modalMessage);
      })
      .catch(error => console.error('Error creando referencia:', error));
  };

  useEffect(() => {

    if (referenciaId) {
    }
    console.log(referenciaId);
  }, [referenciaId])


  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length >= 1 && files.length <= 5) {
      setSelectedFiles([...files]);
      setUploadButtonEnabled(true);
      setMaxImageWarning("");
    } else {
      setSelectedFiles([]);
      setUploadButtonEnabled(false);
      if (files.length > 5) {
        setMaxImageWarning("¡Solo se permiten un máximo de 5 imágenes!");
      } else {
        setMaxImageWarning("");
      }
    }
  };

  const handleFormSubmitPhotos = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append("photos", file);
    }

    // Enviar la solicitud POST a la API
    axios
      .post(
        `https://api.kostumes.store/api/referencias/${referenciaId}/photos`,
        formData
      )
      .then((response) => {
        // Manejar la respuesta de la API aquí
        const responseData = response.data;
        if (responseData.message) {
          setResponseMessage(responseData.message); // Mensaje personalizado desde la API
          console.log(responseData.message);
          setModalMessage('Referencia creada exitosamente')
          setModalIsOpen(true);
          resetForm();
        } else {
          setResponseMessage("Error al registrar el producto");
        }
      })
      .catch((error) => {
        // Manejar errores de la API aquí
        console.error(error);
        setResponseMessage("Error al registrar el producto");
      });
  };


  return (
    <div className='Form-Container-Reference'>
      <div className='Div-Cabecera'>
        <h1>Crear Referencia</h1>
        <Link to="http://localhost:3000/references">
          <div className='volver'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <p>Volver</p>
          </div>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Nombre:
          <br />
          <input type="text" value={referencia.nombreReferencia} required onChange={(e) => setReferencia({ ...referencia, nombreReferencia: e.target.value })}
            onInvalid={(e) => e.target.setCustomValidity('Este campo es obligatorio')}
            onInput={(e) => e.target.setCustomValidity('')} />
        </label>
        <br />
        <br />
        <div className='Div-Personalizado'>
          <label>
            Categorías:
            <br />
            <select required multiple onChange={handleCategoriaChange}>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Características:
            <br />
            <select required multiple onChange={handleCaracteristicaChange}>
              {caracteristicas.map(caracteristica => (
                <option key={caracteristica.id} value={caracteristica.id}>{caracteristica.name}</option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <label>Descripción:
          <br />
          <textarea class="info" value={referencia.descripcion} required
            onChange={(e) => setReferencia({ ...referencia, descripcion: e.target.value })}
            rows="6" cols="50" maxLength="500" placeholder="Escribe aquí..." 
            onInvalid={(e) => e.target.setCustomValidity('Este campo es obligatorio')}
            onInput={(e) => e.target.setCustomValidity('')} />
        </label>
        <button
          className={`button-guardar ${referenceSaved ? 'button-disabled' : ''}`}
          type="submit" disabled={referenceSaved}
          style={{ cursor: referenceSaved ? 'not-allowed' : 'pointer' }}
        >Guardar Información</button>
        <br />
        <br />
      </form>
      {referenceSaved && (
        <div>
          <form onSubmit={handleFormSubmitPhotos}>
            <label>
              Cargar imágenes:
              <br />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>
            {maxImageWarning && <p className="max-image-warning">{maxImageWarning}</p>}
            <button
              className={`button-guardar ${!uploadButtonEnabled ? 'button-disabled' : ''}`}
              type="submit"
              disabled={!uploadButtonEnabled}
              style={{ cursor: uploadButtonEnabled ? 'pointer' : 'auto' }}>
              Guardar Referencia
            </button>
          </form>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mensaje Modal"
        style={{
          content: {
            width: '250px',
            height: '250px',
            margin: 'auto',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            fontFamily: 'poppins',
            fontWeight: '600',
            borderRadius: '10px',
            backgroundColor: 'rgba(248, 225, 237, 0.8)'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        }}
      >
        <p style={{ textAlign: 'center' }}>{modalMessage}</p>
        <button className='button-modal' onClick={() => {
          setModalIsOpen(false);
        }}>Cerrar</button>
      </Modal>
    </div>
  )
}

export default CrearReferencia