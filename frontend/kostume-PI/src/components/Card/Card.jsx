const Card = (prop) => {
  return (
    <div className="bg-card flex flex-col md:flex-row justify-center rounded-lg gap-6 p-6">
      <div className="flex order-2 md:order-1 justify-center items-center md:items-start">
        <img
          className="w-full min-w-0 h-auto max-h-[354px] rounded-2xl"
          src={prop.photos[0].url}
          alt={`Imagen de ${prop.name}`}
        />
      </div>

      <div className="flex flex-col order-3 md:order-2 justify-center items-center gap-3 md:gap-14">
        <h2 className="text-black font-normal text-center">{prop.name}</h2>

        <button className="bg-btn-primary rounded-full text-base font-semibold h-9 w-32 text-black shadow-md shadow-gray-400">
          {"Reservar >"}
        </button>
      </div>

      <div className="flex order-1 md:order-3 justify-center items-center md:items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="fill-black w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
