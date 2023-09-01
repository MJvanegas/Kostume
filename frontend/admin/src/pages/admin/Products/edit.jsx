import { useParams, Link } from "react-router-dom";
import InputField from "/src/Components/InputField/";
import SelectField from "/src/Components/SelectField/";
import TextareaField from "/src/Components/TextareaField/";

const data = [
  {
    id: 1,
    name: "Disfraz 1",
    description: "Descripción del disfraz 1",
    category: {
      id: 1,
      name: "Categoria 1",
    },
    state: "Disponible",
  },
  {
    id: 2,
    name: "Disfraz 2",
    description: "Descripción del disfraz 2",
    category: {
      id: 2,
      name: "Categoria 2",
    },
    state: "Disponible",
  },
  {
    id: 3,
    name: "Disfraz 3",
    description: "Descripción del disfraz 3",
    category: {
      id: 1,
      name: "Categoria 1",
    },
    state: "Disponible",
  },
  {
    id: 4,
    name: "Disfraz 4",
    description: "Descripción del disfraz 4",
    category: {
      id: 2,
      name: "Categoria 2",
    },
    state: "No disponible",
  },
];

const EditProduct = () => {
  const { id } = useParams();
  const product = data.filter((item) => item.id === parseInt(id))[0];
  const categoryOptions = [
    { value: "1", label: "Categoria 1" },
    { value: "2", label: "Categoria 2" },
  ];
  const stateOptions = [
    { value: "Disponible", label: "Disponible" },
    { value: "No disponible", label: "No disponible" },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-primary-100 w-[503px] p-5 rounded-xl">
        <h1 className="text-center text-3xl font-semibold leading-9 mt-6">
          Editar Producto
        </h1>

        <div className="flex flex-col p-5 mt-4">
          <InputField
            label="Nombre del producto"
            defaultValue={product.name}
            id="name"
          />

          <SelectField
            label="Categoría"
            defaultValue={product.category.id.toString()}
            options={categoryOptions}
            id="category"
          />

          <TextareaField
            label="Descripción"
            defaultValue={product.description}
            id="description"
            rows={3}
          />

          <SelectField
            label="Estado"
            defaultValue={product.state.toString()}
            options={stateOptions}
            id="state"
          />
        </div>

        <div className="flex flex-row justify-between items-center px-10 text-3xl font-semibold leading-9 mt-2 mb-6">
          <Link
            to="/products"
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

export default EditProduct;
