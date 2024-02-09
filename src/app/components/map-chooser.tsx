import { StateHelper } from "states/sunchaser-result";

export const MapChooser = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-6 w-full">
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
  const { mapInstance } = StateHelper.mapInstance();
  return (
    <button
      className="border-2 px-4 py-2 bg-greens-300 shadow-md rounded-lg border-greens-300"
      onClick={() => mapInstance?.adjustStyle(style)}
    >
      {children}
    </button>
  );
};
