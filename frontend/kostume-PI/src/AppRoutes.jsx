import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CrearReferencia from "./Routes/RegisterProduct/CrearReferencia";
import Home from "./Routes/Home/Home";
import Header from "./components/Header/Header";
import Detail from "./Routes/detail/Detail";
import RegisterUser from "./Routes/RegisterUser/RegisterUser";
import LoginForm from "./components/LoginForm/LoginForm";
import UserProfile from "./components/LoginForm/UserProfile";
import Footer from "./components/Footer/Footer";
import Modal from 'react-modal';
import CrearDisfrazPorReferencia from "./Routes/RegisterProduct/CrearDisfrazPorReferencia";


Modal.setAppElement('#root');

export const AppRoutes = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/referencia/:id" element={<Detail />} />
        <Route path="/crear-referencia" element={<CrearReferencia />} />
        <Route path="/crear-disfraz" element={<CrearDisfrazPorReferencia />} />
        <Route path="/crear-cuenta" element={<RegisterUser />} />
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <Footer />

    </>

  );
};



