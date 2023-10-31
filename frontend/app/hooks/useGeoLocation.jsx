import React, { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((coordinates) => {
        console.log(coordinates);
        const {
          coords: { latitude, longitude },
        } = coordinates;
        setLocation({ lat: latitude, lng: longitude });
      });
    } else {
      console.log("Not supported bt browser");
    }
  }, []);
  return location;
};

export default useGeoLocation;
