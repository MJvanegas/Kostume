/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Carrusel.css";

export default function Carousel({ images }) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0]?.url : null
  );

  const previus = () => {
    const condition = selectIndex > 0;
    const nextIndex = condition ? selectIndex - 1 : images.length - 1;
    setSelectedImage(images[nextIndex]?.url);
    setSelectIndex(nextIndex);
  };

  const next = () => {
    const condition = selectIndex < images.length - 1;
    const nextIndex = condition ? selectIndex + 1 : 0;
    setSelectedImage(images[nextIndex]?.url);
    setSelectIndex(nextIndex);
  };
  console.log(images, "trae el carrousel");

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-image-container">
          {selectedImage && (
            <img className="img_corrousel" src={selectedImage} alt="carrusel" />
          )}
          <div className="slider__controls">
            <button onClick={previus}>{"<"}</button>
            <button onClick={next}>{">"}</button>
          </div>
        </div>
      </div>
    </>
  );
}
