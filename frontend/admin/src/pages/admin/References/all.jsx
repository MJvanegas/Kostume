import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";

const columns = [
  { header: "", width: "w-[5%]" },
  { header: "nombre", field: "name", width: "w-[15%]" },
  { header: "detalle", field: "detail", width: "w-[30%]" },
  {
    header: "categorías",
    field: (item) =>
      item.categories
        .map((category) => category.name)
        .join(", ")
        .trim(),
    width: "w-[15%]",
  },
  {
    header: "Características",
    field: (item) =>
      item.characteristics
        .map((characteristic) => characteristic.name)
        .join(", ")
        .trim(),
    width: "w-[20%]",
  },
  { header: "", width: "w-[5%]" },
];

const References = () => {
  const navigate = useNavigate();
  const [references, setReferences] = useState(null);

  useEffect(() => {
    fetch("https://api.kostumes.store/api/referencias")
      .then((res) => res.json())
      .then((data) => {
        setReferences(data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const handleEdit = (item) => {
    navigate(`/references/edit/${item.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="http://localhost:5173/crear-referencia"
        className="ml-auto bg-primary-400 hover:bg-primary-300 text-white text-base rounded-full w-[200px] py-1 px-8 flex justify-center items-center"
      >
        Agregar
      </Link>

      {references && (
        <DataTable
          columns={columns}
          data={references}
          onEdit={handleEdit}
        ></DataTable>
      )}
    </div>
  );
};

export default References;
