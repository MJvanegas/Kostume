import React, { useEffect, useState } from 'react'
import axios from "axios";
import './CrearDisfraz.css'
import Modal from 'react-modal';


const CrearDisfrazPorReferencia = () => {

  const [costume, setCostume] = useState({
    nombre:"",
    precioCompra: 0,
    precioRenta: 0,
    fechaCompra:"",
    observaciones:"",
    talla:"",
    idReference:0,
  })


  const [optionsReferences, setOptionsReferences] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [precioCompraValidationMessage, setPrecioCompraValidationMessage] = useState("");
  const [precioAlquilerValidationMessage, setPrecioAlquilerValidationMessage] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedMaxDate = `${year}-${month}-${day}`;

  const [maxDate, setMaxDate] = useState(formattedMaxDate);


  const urlGet = 'https://api.kostumes.store/api/referencias'
  useEffect(() => {
    // Realiza la solicitud GET a la API
    axios.get(urlGet)
      .then(response => {
        // Actualiza el estado con los datos de la API
        setOptionsReferences(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  const handleSelectReferenceChange = (e) => {
    setCostume({...costume, idReference:e.target.value});
  };

  const handleCostumeNameChange = (e) => {
    setCostume({...costume, nombre:e.target.value})
  };

  const handlePrecioCompraChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(sanitizedValue);

    if (isNaN(numericValue)) {
      setPrecioCompraValidationMessage("Ingresa un valor numérico válido.");
    } else {
      setPrecioCompraValidationMessage("");
    }

    setCostume({...costume, precioCompra: numericValue || 0});
  }

  const handleFechaCompraChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate > maxDate) {
      console.log("La fecha de compra no puede ser posterior a la actual");
      return;
    }
    console.log('esto es lo que muestra maxDate',maxDate);

    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    setCostume({...costume, fechaCompra: formattedDate});
  };
  
  const handlePrecioAlquierChange = (e) => {
    const valorInicial = e.target.value.replace(/[^0-9.]/g, '');
    const valorFormateado = parseFloat(valorInicial);

    if (isNaN(valorFormateado)) {
      setPrecioAlquilerValidationMessage("Ingresa un valor numérico válido.");
    } else {
      setPrecioAlquilerValidationMessage("");
    }

    setCostume({...costume, precioRenta: valorFormateado || 0});
  }

  const handleObservacionesChange = (e) => {
    setCostume({...costume,observaciones: e.target.value})
  }

  const handleTallaChange = (e) => {
    setCostume({...costume, talla:e.target.value})
  }

  const resetForm = () => {
    setCostume({
      nombre:"",
      precioCompra:0,
      precioRenta:0,
      fechaCompra:"",
      observaciones:"",
      talla:"",
      idReference:0,
    })
  }


  const handleFormCostumeSubmit = (e) => {
    e.preventDefault();

    fetch('https://api.kostumes.store/api/disfraces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(costume)
    })
      .then(response => response.json())
      .then(data => {
        console.log(costume);
        // Hacer algo con la respuesta de la API si es necesario
        console.log('Respuesta de la API:', data);
        if (data.message === 'Disfraz agregado exitosamente') {
          // Mensaje de usuario ya registrado
          setModalMessage(data.message)
          setModalIsOpen(true);
          resetForm();

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

  


  return (
    <div className='Form-Container'>
          <form onSubmit={handleFormCostumeSubmit} >
            <h1>Crear Disfraz</h1>
              <label>Referencia:
                <br />
                <select className='select-ref-personalizado' value={costume.idReference} onChange={handleSelectReferenceChange} required>
                  <option value="">Seleccione una referencia</option>
                  {optionsReferences.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </label>
              <br />
              <label>Nombre:
                <br />
                <input className='margin-personalizado' type="text" value={costume.nombre} onChange={handleCostumeNameChange} required/>
              </label>
              <div className='Div-Personalizado'>
                <label htmlFor="dateInput">Fecha de compra:
                  <input className='input-personalizado' type="date" id="dateInput" value={costume.fechaCompra} onChange={handleFechaCompraChange} max={maxDate} required/>
                </label>
                <br />
                <label htmlFor="currencyInput">Precio de compra:
                  <input className='input-personalizado' type="text" id="currencyInput" value={costume.precioCompra} onChange={handlePrecioCompraChange} required/>
                  <p className="validation-message">{precioCompraValidationMessage}</p>
                </label>
              </div>
            <div className='Div-Personalizado'>
                <label>Talla:
                  <br /> 
                  <select className='select-div-personalizado' value={costume.talla} onChange={handleTallaChange} required>
                    <option value="">Seleccione una talla</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </label>
                <br />
                <label htmlFor="currencyInputAlquiler">Precio de alquiler:
                <br />
                  <input className='input-personalizado' type="text" id="currencyInputAlquiler" value={costume.precioRenta} onChange={handlePrecioAlquierChange} required/>
                  <p className="validation-message">{precioAlquilerValidationMessage}</p>
                </label>
              </div>
            <label>Observaciones:</label>
            <textarea value={costume.observaciones} onChange={handleObservacionesChange} rows="4" cols="50" maxLength="200" placeholder="Escribe aquí..." required/>
            <button className="button-guardar" type="submit">Guardar</button>  
          </form>
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

export default CrearDisfrazPorReferencia