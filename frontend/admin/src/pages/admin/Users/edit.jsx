import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();

  return (
    <div className="text-white">
      <h1>EditUser</h1>
      <p>{id}</p>
    </div>
  );
};

export default EditUser;
