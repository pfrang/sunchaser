import { useMapInstance } from "states/sunchaser-result";

import { MapOptionsEnum } from "./settings-form-values";

// TODO save map choice in mapbox initialization convert this to form

export const MapChooser = ({
  mapOption,
  setMapOption,
}: {
  mapOption: MapOptionsEnum;
  setMapOption: (option: MapOptionsEnum) => void;
}) => {
  return (
    <div className="grid w-full justify-between grid-cols-3 gap-4 px-6">
      {Object.entries(MapOptionsEnum).map(([key, value]) => (
        <MapButton
          key={key}
          mapOption={mapOption}
          setMapOption={setMapOption}
          style={value}
        >
          <p className="text-variant-regular">{key}</p>
        </MapButton>
      ))}
    </div>
  );
};

const MapButton = ({
  children,
  mapOption,
  setMapOption,
  style,
}: {
  children: React.ReactNode;
  mapOption: MapOptionsEnum;
  setMapOption: (option: MapOptionsEnum) => void;
  style: MapOptionsEnum;
}) => {
  const { mapInstance } = useMapInstance();
  return (
    <button
      className={`rounded-lg hover:bg-greens-400 border-2 border-greens-300 h-fit bg-greens-300 px-4 py-2 shadow-md ${
        mapOption === style ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setMapOption(style);
        mapInstance?.adjustStyle(style);
      }}
    >
      {children}
    </button>
  );
};
