import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";

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

const columns = [
  { header: "", width: "w-[5%]" },
  { header: "nombre disfraz", field: "name", width: "w-[20%]" },
  { header: "descripción", field: "description", width: "w-[30%]" },
  {
    header: "categoría",
    field: (item) => item.category.name,
    width: "w-[20%]",
  },
  { header: "estado", field: "state", width: "w-[20%]" },
  { header: "", width: "w-[5%]" },
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("https://api.kostumes.store/api/disfraces")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  console.log("products", products);

  const handleEdit = (item) => {
    navigate(`/products/edit/${item.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/products/add"
        className="ml-auto bg-primary-400 hover:bg-primary-300 text-white text-base rounded-full w-[200px] py-1 px-8 flex justify-center items-center"
      >
        Agregar
      </Link>

      <DataTable columns={columns} data={data} onEdit={handleEdit}></DataTable>
    </div>
  );
};

export default Products;
