import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";

const columns = [
  { header: "", width: "w-[5%]" },
  { header: "nombre", field: "name", width: "w-[30%]" },
  { header: "imágen", field: "photo", width: "w-[60%]" },
  { header: "", width: "w-[5%]" },
];

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch("https://api.kostumes.store/api/categorias")
      .then((res) => res.json())
      .then((data) =>
        setCategories(
          data.data.map((category) => {
            return {
              ...category,
              photo: isValidUrl(category.photo) ? (
                <img
                  src={category.photo}
                  alt={category.name}
                  className="w-[30%]"
                />
              ) : (
                category.photo
              ),
            };
          })
        )
      )
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const handleEdit = (item) => {
    navigate(`/categories/edit/${item.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/categories/add"
        className="ml-auto bg-primary-400 hover:bg-primary-300 text-white text-base rounded-full w-[200px] py-1 px-8 flex justify-center items-center"
      >
        Agregar
      </Link>

      {categories && (
        <DataTable columns={columns} data={categories} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default Categories;
