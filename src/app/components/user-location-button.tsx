import { StateHelper } from "states/sunchaser-result";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export const UserLocationButton = () => {
  const { mapInstance } = StateHelper.useMapInstance();

  return (
    <button
      onClick={() => mapInstance?.flyToUserLocation()}
      className="rounded-2xl border-2 bg-white p-1"
    >
      <MyLocationIcon fontSize="large" />
    </button>
  );
};
