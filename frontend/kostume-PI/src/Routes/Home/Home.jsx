import { useState, useEffect } from "react";
import "./styles.css";
import Katrina from "/src/assets/img/katrina.png";
import GirlImg from "/src/assets/img/girl.jpg";
import BoyImg from "/src/assets/img/boy.jpg";
import ManImg from "/src/assets/img/man.png";
import WomanImg from "/src/assets/img/woman.png";
import Category from "../../components/Category/Category";
import Card from "../../components/Card/Card";
import SearchForm from "../../components/Search/Search";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

const categories = [
  {
    image: GirlImg,
    altText: "Categoría de niña",
    text: "Niña",
    path: "/girl",
  },
  {
    image: BoyImg,
    altText: "Categoría de niño",
    text: "Niño",
    path: "/boy",
  },
  {
    image: ManImg,
    altText: "Categoría de hombre",
    text: "Hombre",
    path: "/man",
  },
  {
    image: WomanImg,
    altText: "Categoría de mujer",
    text: "Mujer",
    path: "/woman",
  },
];

const Home = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetch("https://api.kostumes.store/api/referencias/referenciasaleatorias")
      .then((res) => res.json())
      .then((data) => setCards(data.data));
  }, []);

  const handleSearch = (search) => {
    console.log("Search Form Data:", search);
  };

  return (
    <Container>
      <div className="bg-black isolate w-full">
        <section className="flex flex-row justify-between">
          <div className="bg-search flex flex-col justify-center items-center gap-4 xl:gap-14 w-2/3">
            <h2 className="text-primary text-xl md:text-2xl lg:text-3xl font-normal w-full lg:w-3/5 2xl:w-2/5 text-center">
              Encuentra el disfraz perfecto para tu próxima fiesta
            </h2>

            <SearchForm onSearch={handleSearch} />
          </div>

          <img
            className="bg-cover bg-center w-1/3 h-1/3 -z-10"
            src={Katrina}
            alt="Imagen de fondo katrina"
          />
        </section>

        <section className="flex flex-col bg-[#2B1621] bg-opacity-70 mt-0 lg:-mt-12 xl:-mt-24 z-10">
          <h2 className="text-primary text-xl md:text-2xl lg:text-3xl font-bold p-3">
            Categorías
          </h2>

          <ul className="flex justify-center p-0 md:p-3 gap-1 lg:gap-10">
            {categories.map((category, index) => (
              <li key={index}>
                <Category key={index} {...category} />
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col justify-center items-center gap-8 my-8">
          <h2 className="text-primary text-2xl md:text-3xl lg:text-5xl font-normal text-center">
            Top en Alquiler
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[60%] lg:max-w-[90%] xl:max-w-[70%] 2xl:max-w-[55%]">
            {cards?.map((card, index) => (
              <Link to={`/referencia/` + card.id} key={card.id}> 
              <Card key={index} {...card} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Home;
