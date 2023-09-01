import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";

const data = [
  {
    id: 1,
    name: "Usuario 1",
    email: "usuario1@email.com",
    type: "Administrador",
  },
  {
    id: 2,
    name: "Usuario 2",
    email: "usuario2@email.com",
    type: "Administrador",
  },
  {
    id: 3,
    name: "Usuario 3",
    email: "cliente1@email.com",
    type: "Cliente",
  },
  {
    id: 4,
    name: "Usuario 4",
    email: "cliente2@email.com",
    type: "Cliente",
  },
];

const columns = [
  { header: "", width: "w-[5%]" },
  { header: "nombre", field: "name", width: "w-[30%]" },
  { header: "correo", field: "email", width: "w-[30%]" },
  { header: "tipo", field: "type", width: "w-[30%]" },
  { header: "", width: "w-[5%]" },
];

const Users = () => {
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate(`/users/edit/${item.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/users/add"
        className="ml-auto bg-primary-400 hover:bg-primary-300 text-white text-base rounded-full w-[200px] py-1 px-8 flex justify-center items-center"
      >
        Agregar
      </Link>

      <DataTable columns={columns} data={data} onEdit={handleEdit}></DataTable>
    </div>
  );
};

export default Users;
