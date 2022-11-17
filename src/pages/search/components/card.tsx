export const Card = ({ modifiedDate, location, temperature, wind, time }) => {
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="text-md flex flex-col flex h-[50px] ">
        <img
          className="object-fit h-[50px]"
          src="/icons/black/svg/chanceflurries.svg"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-1/5">
          <p>{modifiedDate}</p>
        </div>
        <div>Google Maps?</div>
      </div>

      <div className="flex flex-col justify-between text-right h-full w-full break-words">
        <h2 className="text-md">{location}</h2>

        <div>{`${temperature}°`}</div>
        <div>{wind}</div>
        <div className="text-md tablet:text-xl">{time}</div>
      </div>
    </div>
  );
};
