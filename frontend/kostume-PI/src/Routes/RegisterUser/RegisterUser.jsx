import React, { useEffect, useState } from 'react';
import './RegisterUser.css';
import Catrina2 from "/src/assets/img/Catrina2.jpg";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';


const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es requerido').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  apellido: Yup.string().required('El apellido es requerido').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  email: Yup.string().required('El email es requerido').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  numerodeIdentificacion: Yup.string().required('El número de identificación es requerido').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  ciudad: Yup.string().required('La ciudad es requerida').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  departamento: Yup.string().required('El departamento es requerido').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  direccion: Yup.string().required('La dirección es requerida').matches(/^[^\s].*[^\s]$/, 'No se permiten espacios en blanco'),
  contraseña: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/, 'La contraseña debe contener al menos 1 número')
    .matches(/^\S+$/, 'No se permiten espacios en blanco'),
  confirmarContraseña: Yup.string()
    .oneOf([Yup.ref('contraseña'), null], 'Las contraseñas deben coincidir')
    .required('La confirmación de contraseña es requerida'),
});

const RegisterUser = () => {


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const handleSubmit = (userValues, { resetForm }) => {

    // Realizar la solicitud POST a la API con el contenido de 'referencia'
    fetch('https://api.kostumes.store/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: userValues.nombre,
        apellido: userValues.apellido,
        email: userValues.email,
        numerodeIdentificacion: userValues.numerodeIdentificacion,
        ciudad: userValues.ciudad,
        departamento: userValues.departamento,
        direccion: userValues.direccion,
        contraseña: userValues.contraseña,
      })
    })
      .then(response => response.json())
      .then(data => {

        // Hacer algo con la respuesta de la API si es necesario
        console.log('Respuesta de la API:', data);
        if (data.message === 'Usuario registrado exitosamente') {
          // Mensaje de usuario ya registrado
          setModalMessage(data.message + "\n¡Asegúrate de iniciar sesión!")
          setModalIsOpen(true);
          resetForm();

        } else if (data.message === 'Revisa los datos para crear el usuario, se han encontrado errores') {
          // Mensaje de usuario creado exitosamente
          setModalMessage(data.data[0])
          setModalIsOpen(true);
          resetForm();
          // alert(data.data[0]);
        }
        console.log('esto muestra el modalMessage', modalMessage);
      })
      .catch(error => {
        console.error('Error creando usuario:', error);
        setModalMessage('Ocurrió un error al procesar la solicitud.');
        setModalIsOpen(true);
        console.log('Datos enviados', userValues);
      });
  };

  return (
    <div className="Container-Global">
      <img src={Catrina2} alt="Imagen Catrina" />
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          email: '',
          numerodeIdentificacion: '',
          ciudad: '',
          departamento: '',
          direccion: '',
          contraseña: '',
          confirmarContraseña: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="Form-Container">
          <Form>
            <h1>Crear cuenta</h1>
            <div className='Div-Personalizado'>
              <label>Nombre:
                <br />
                <Field className="Input-Personalizado" type="text" name="nombre" />
                <ErrorMessage name="nombre" component="div" className="error-message" />
              </label>
              <label>Apellido:
                <br />
                <Field className="Input-Personalizado" type="text" name="apellido" />
                <ErrorMessage name="apellido" component="div" className="error-message" />
              </label>
            </div>
            <label>Número de identificación:
              <br />
              <Field type="text" name="numerodeIdentificacion" />
              <ErrorMessage name="numerodeIdentificación" component="div" className="error-message" />
            </label>
            <div className='Div-Personalizado'>
              <label>Ciudad:
                <br />
                <Field className="Input-Personalizado" type="text" name="ciudad" />
                <ErrorMessage name="ciudad" component="div" className="error-message" />
              </label>
              <label>Departamento
                <br />
                <Field className="Input-Personalizado" type="text" name="departamento" />
                <ErrorMessage name="departamento" component="div" className="error-message" />
              </label>
            </div>
            <label>Dirección:
              <br />
              <Field type="text" name="direccion" />
              <ErrorMessage name="direccion" component="div" className="error-message" />
            </label>
            <label>Correo electrónico:
              <br />
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </label>
            <div className='Div-Personalizado'>
              <label>Contraseña:
                <br />
                <Field className="Input-Personalizado" type="password" name="contraseña" />
                <ErrorMessage name="contraseña" component="div" className="error-message" />
              </label>
              <label>Confirmar Contraseña:
                <br />
                <Field className="Input-Personalizado" type="password" name="confirmarContraseña" />
                <ErrorMessage name="confirmarContraseña" component="div" className="error-message" />
              </label>
            </div>
            <button className="button-guardar" type="submit">Guardar</button>
          </Form>
        </div>
      </Formik>
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
        <button className='button-modal' onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  )
}

export default RegisterUser