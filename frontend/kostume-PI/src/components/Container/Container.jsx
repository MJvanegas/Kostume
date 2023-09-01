import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="flex flex-col items-center mt-24">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
