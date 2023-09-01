import PropTypes from "prop-types";

const InputField = ({ label, defaultValue, id }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-2xl font-medium leading-7 mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        defaultValue={defaultValue}
        className="text-lg font-normal leading-7 rounded-full px-5 py-2"
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default InputField;
