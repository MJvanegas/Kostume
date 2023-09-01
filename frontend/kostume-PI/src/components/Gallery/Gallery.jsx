/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-modal";
import Carrusel from "../Carrusel/Carousel";
import "./Gallery.css";

const Gallery = ({ images }) => {
  const [modalIsOpen, setIsModalOpen] = useState(false);

  console.log(images, "esto es images");

  return (
    <>
      <section className="gallery__container">
        <figure className="gallery__content">
          {images?.map((photo, index) => (
            <img
              className="content-image"
              key={index}
              src={photo.url}
              alt={`${index}`}
            />
          ))}
        </figure>

        <div className="more">
          <a onClick={() => setIsModalOpen(true)}>Ver mas</a>
        </div>
      </section>

      <section className="modal">
        <Modal
          className="content-modal"
          isOpen={modalIsOpen}
          contentLabel="Carrusel Modal"
        >
          {images && <Carrusel images={images} />}
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            x
          </button>
        </Modal>
      </section>
    </>
  );
};
export default Gallery;
