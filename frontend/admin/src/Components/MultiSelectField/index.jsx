import PropTypes from "prop-types";

const MultiSelectField = ({ label, defaultValue, options, id }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-2xl font-medium leading-7 mt-6 mb-2">
        {label}
      </label>
      <select
        id={id}
        multiple
        defaultValue={defaultValue}
        className="text-lg font-normal leading-7 rounded-2xl px-5 py-2 w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default MultiSelectField;
