import PropTypes from "prop-types";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const EllipsisMenu = ({ onDelete, onDisable, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  const handleDisable = () => {
    onDisable();
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 z-0"
          onClick={toggleMenu}
        >
          <HiDotsVertical />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 w-[153px] bg-white border border-gray-300 rounded shadow-lg z-10">
          <button
            className="block px-4 py-2 w-full text-secondary-600 text-left hover:bg-secondary-100"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="block px-4 py-2 w-full text-secondary-600 text-left hover:bg-secondary-100"
            onClick={handleDisable}
          >
            Desactivar
          </button>
          <button
            className="block px-4 py-2 w-full text-secondary-600 text-left hover:bg-secondary-100"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

EllipsisMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EllipsisMenu;
