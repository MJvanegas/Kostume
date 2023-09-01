import PropTypes from "prop-types";
import { useState, Fragment } from "react";
import EllipsisMenu from "../EllipsisMenu";
import {
  AiOutlineDownCircle,
  AiOutlineUpCircle,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";

const DataTable = ({ columns, data, onEdit }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpand = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Collapse the row detail
    } else {
      setExpandedRow(index); // Expand the row detail
    }
  };

  return (
    <table className="table-auto bg-white border-0 border-secondary-100 overflow-hidden rounded-lg w-full">
      <thead className="bg-secondary-100">
        <tr>
          {columns.map((column, index) => (
            <th
              className={`p-2 font-semibold text-secondary-200 text-xs text-left ${column.width}`}
              key={index}
            >
              {column.header.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <Fragment key={`collapse-row-${index}`}>
            <tr className="border border-secondary-100">
              <td className="p-2 text-center">
                <button
                  className={`${
                    expandedRow === index ? "text-gray-700" : "text-gray-400"
                  } text-base`}
                  onClick={() => toggleExpand(index)}
                >
                  {expandedRow === index ? (
                    <AiOutlineUpCircle />
                  ) : (
                    <AiOutlineDownCircle />
                  )}
                </button>
              </td>
              <td className="p-2 text-sm text-secondary-400">{item.name}</td>
              <td colSpan={columns.length - 3}></td>
              <td className="absolute p-2">
                <EllipsisMenu
                  onDelete={() => console.log("Delete")}
                  onDisable={() => console.log("Disable")}
                  onEdit={() => onEdit(item)}
                />
              </td>
            </tr>
            {expandedRow === index && (
              <tr
                className="border border-secondary-100"
                key={`expanded-row-${index}`}
              >
                <td colSpan={2}></td>
                {columns
                  .slice(2, columns.length - 1)
                  .map((column, columnIndex) => (
                    <td
                      className="p-2 text-sm text-secondary-400"
                      key={`col-${columnIndex}`}
                    >
                      {typeof column.field === "function"
                        ? column.field(item)
                        : item[column.field]}
                    </td>
                  ))}
                <td colSpan={1}></td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
      <tfoot className="bg-secondary-100">
        <tr>
          <td colSpan={columns.length - 3}></td>
          <td>
            <span className="p-2 font-semibold text-xs text-secondary-200">
              Filas por pagina: 10
            </span>
          </td>
          <td>
            <span className="p-2 font-semibold text-xs text-secondary-200">
              1-4 de 4
            </span>
          </td>
          <td className="p-2 flex flex-row">
            <button className="text-gray-400 hover:text-gray-700">
              <AiOutlineLeft />
            </button>
            <button className="text-gray-400 hover:text-gray-700">
              <AiOutlineRight />
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default DataTable;
