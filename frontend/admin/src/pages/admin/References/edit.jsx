import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import InputField from "../../../Components/InputField/";
import TextareaField from "../../../Components/TextareaField/";
import MultiSelectField from "../../../Components/MultiSelectField/";

const EditReference = () => {
  const { id } = useParams();
  const [reference, setReference] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [characteristicOptions, setCharacteristicOptions] = useState([]);

  useEffect(() => {
    fetch(`https://api.kostumes.store/api/referencias/${id}`)
      .then((res) => res.json())
      .then((data) => setReference(data.data))
      .catch((error) => {
        console.error("References API error:", error);
      });

    fetch(`https://api.kostumes.store/api/categorias`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryOptions(
          data.data.map((category) => {
            return { value: category.id.toString(), label: category.name };
          })
        );
      })
      .catch((error) => {
        console.error("Categories API error:", error);
      });

    fetch(`https://api.kostumes.store/api/caracteristicas`)
      .then((res) => res.json())
      .then((data) => {
        setCharacteristicOptions(
          data.data.map((characteristic) => {
            return {
              value: characteristic.id.toString(),
              label: characteristic.name,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Categories API error:", error);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-primary-100 w-[503px] p-5 rounded-xl">
        <h1 className="text-center text-3xl font-semibold leading-9 mt-6">
          Editar Referencia
        </h1>

        {reference && (
          <div className="flex flex-col p-5 mt-4">
            <InputField
              label="Nombre de la referencia"
              defaultValue={reference.name}
              id="name"
            />

            <TextareaField
              label="Detalle"
              defaultValue={reference.detail}
              id="detail"
              rows={3}
            />

            <MultiSelectField
              label="Categoría"
              defaultValue={reference.categories.map((category) =>
                category.id.toString()
              )}
              options={categoryOptions}
              id="category"
            />

            <MultiSelectField
              label="Características"
              defaultValue={reference.characteristics.map((characteristic) =>
                characteristic.id.toString()
              )}
              options={characteristicOptions}
              id="characteristic"
            />
          </div>
        )}

        <div className="flex flex-row justify-between items-center px-10 text-3xl font-semibold leading-9 mt-2 mb-6">
          <Link
            to="/references"
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

export default EditReference;
