import { useMapInstance } from "states/sunchaser-result";

// TODO save map choice in mapbox initialization convert this to form

export const MapChooser = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-4 px-6">
      <MapButton style="mapbox://styles/mapbox/streets-v11">
        <p className="text-variant-regular">Standard</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/streets-v12">
        <p className="text-variant-regular">Streets</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/outdoors-v12">
        <p className="text-variant-regular">Outdoors</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/light-v11">
        <p className="text-variant-regular">Light</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/dark-v11">
        <p className="text-variant-regular">Dark</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/satellite-v9">
        <p className="text-variant-regular">Satellite</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/satellite-streets-v12">
        <p className="text-variant-regular">Satellite streets</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/navigation-day-v1">
        <p className="text-variant-regular">Navigation day</p>
      </MapButton>
      <MapButton style="mapbox://styles/mapbox/navigation-night-v1">
        <p className="text-variant-regular">Navigation night</p>
      </MapButton>
    </div>
  );
};

const MapButton = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: string;
}) => {
  const { mapInstance } = useMapInstance();
  return (
    <button
      className="rounded-lg border-2 border-greens-300 bg-greens-300 px-4 py-2 shadow-md"
      onClick={(e) => {
        e.stopPropagation();
        mapInstance?.adjustStyle(style);
      }}
    >
      {children}
    </button>
  );
};
