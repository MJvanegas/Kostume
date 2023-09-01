import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import InputField from "/src/Components/InputField/";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.kostumes.store/api/categorias")
      .then((res) => res.json())
      .then((data) => data.data.filter((item) => item.id === parseInt(id))[0])
      .then((data) => setCategory(data))
      .catch((error) => {
        console.error("API error:", error);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-primary-100 w-[503px] p-5 rounded-xl">
        <h1 className="text-center text-3xl font-semibold leading-9 mt-6">
          Editar Categoría
        </h1>

        {category && (
          <div className="flex flex-col p-5 mt-4">
            <InputField
              label="Nombre de la categoría"
              defaultValue={category.name}
              id="name"
            />

            <InputField
              label="Imágen"
              defaultValue={category.photo}
              id="image"
            />
          </div>
        )}

        <div className="flex flex-row justify-between items-center px-10 text-3xl font-semibold leading-9 mt-2 mb-6">
          <Link
            to="/categories"
            className="ml-auto text-primary-600 hover:text-white flex-grow"
          >
            Cancelar
          </Link>

          <button className="bg-primary-400 hover:bg-primary-300 text-black rounded-full w-[209.5px] py-2">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
