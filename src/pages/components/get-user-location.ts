export const destructureMyPosition = (userGeoLocation: any) => {
  return {
    latitude: userGeoLocation.split("&")[0].split("=")[1],
    longitude: userGeoLocation.split("&")[1].split("=")[1],
  };
};
