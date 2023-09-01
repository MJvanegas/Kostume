import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../Components/InputField/";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setCategoryImage(event.target.value);
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName,
      photo: categoryImage || null,
    };

    fetch("https://api.kostumes.store/api/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful creation, e.g., redirect or update UI
        console.log("Category created:", data);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-primary-100 w-[503px] p-5 rounded-xl">
        <h1 className="text-center text-3xl font-semibold leading-9 mt-6">
          Agregar Categoría
        </h1>

        <div className="flex flex-col p-5 mt-4">
          <InputField
            label="Nombre de la categoría"
            value={categoryName}
            onChange={handleNameChange}
            id="name"
          />

          <InputField
            label="Imágen"
            value={categoryImage}
            onChange={handleImageChange}
            id="image"
          />
        </div>

        <div className="flex flex-row justify-between items-center px-10 text-3xl font-semibold leading-9 mt-2 mb-6">
          <Link
            to="/categories"
            className="ml-auto text-primary-600 hover:text-white flex-grow"
          >
            Cancelar
          </Link>

          <button
            onClick={handleAddCategory}
            className="bg-primary-400 hover:bg-primary-300 text-black rounded-full w-[209.5px] py-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
