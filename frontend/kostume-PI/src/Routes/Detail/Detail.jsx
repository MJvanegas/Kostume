import { useEffect, useState } from "react";
import "./Detail.css";
import Gallery from "../../components/Gallery/Gallery";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [kostume, setkostume] = useState();

  useEffect(() => {
    fetch(`https://api.kostumes.store/api/referencias/${id}`)
      .then((Res) => Res.json())
      .then((data) => setkostume(data.data));
  }, [id]);

  console.log(id, " esto es lo que trae el params");
  console.log(kostume, "esto es lo que trae el kostume ");

  return (
    <>
      {kostume && (
        <div className="detail">
          <div className="detail_title">
            <h1 className="title">{kostume.name}</h1>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          </div>

          <div>
            {kostume && <Gallery images={kostume.photos} name={kostume.name} />}
          </div>

          <div className="infoDisfraz">
            <div className="boxA">
              <p className="precioAlquiler">$ 250.000 COP</p>
              <ul className="tallas">
                <p>Selecciona la talla</p>
                <div className="marquilla">
                  <li>S</li>
                  <li>M</li>
                  <li>L</li>
                </div>
              </ul>
              <p className="guia">Ver Guía de tallas</p>
              <button className="button-res" type="submit">
                {" "}
                Reservar{" "}
              </button>
            </div>

            <div className="boxB">
              <p className="descripcion">{kostume.detail}</p>
            </div>
          </div>

          <section className="characteristics_container">
            <h2 className="characteristics">Características</h2>
            <ul className="list_characteristics">
              {kostume.characteristics.map((characteristics) => (
                <li className="list" key={characteristics.id}>
                  <span className="characteristics-name">
                    {characteristics.name}
                  </span>
                  <img
                    className="characteristics-icon"
                    src={`https://api.kostumes.store/images/${characteristics.icon}`}
                    alt={`${characteristics.name} icon`}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </>
  );
};
export default Detail;
