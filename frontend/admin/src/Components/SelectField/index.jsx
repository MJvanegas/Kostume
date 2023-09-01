import PropTypes from "prop-types";
import { BiSolidDownArrow } from "react-icons/bi";

const SelectField = ({ label, defaultValue, options, id }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-2xl font-medium leading-7 mt-6 mb-2">
        {label}
      </label>
      <div className="relative inline-block">
        <select
          id={id}
          defaultValue={defaultValue}
          className="text-lg font-normal leading-7 rounded-full px-5 py-2 appearance-none pr-10 w-full"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <BiSolidDownArrow className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primary-700 pointer-events-none" />
      </div>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default SelectField;
