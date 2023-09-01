import PropTypes from "prop-types";

const Category = ({ image, altText, text, path }) => {
  return (
    <nav>
      <a href={path}>
        <figure>
          <img className="w-60 h-40 md:h-80" src={image} alt={altText} />
          <span>
            <h3 className="text-primary font-normal text-xl md:text-2xl lg:text-3xl text-center mt-3">
              {text}
            </h3>
          </span>
        </figure>
      </a>
    </nav>
  );
};

Category.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Category;
