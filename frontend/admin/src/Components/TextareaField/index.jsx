import PropTypes from "prop-types";

const TextareaField = ({ label, defaultValue, id, rows }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-2xl font-medium leading-7 mt-6 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        defaultValue={defaultValue}
        rows={rows}
        className="text-lg font-normal leading-7 rounded-2xl px-5 py-2"
      />
    </div>
  );
};

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};

export default TextareaField;
