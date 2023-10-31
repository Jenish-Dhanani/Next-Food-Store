import React, { useEffect, useMemo, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import {
  GoogleMap,
  DistanceMatrixService,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import RestaurantCard from "./Restaurant/RestaurantCard";

const GeoLocation = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useGeoLocation();
  //   const location = {
  //     lat: 22.3221027,
  //     lng: 73.1730862,
  //   };
  const { restaurants: restaurantData } = useSelector(
    (state) => state.restaurant
  );

  //   useEffect(() => {
  //     if (!isLoaded || !location) return;

  //     const restaurantDestinations = restaurantData.map((restaurant) => ({
  //       lat: restaurant.geoLocation.coordinates[0],
  //       lng: restaurant.geoLocation.coordinates[1],
  //     }));

  //     const request = {
  //       origins: [{ lat: location.lat, lng: location.lng }],
  //       destinations: restaurantDestinations,
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //       unitSystem: window.google.maps.UnitSystem.METRIC,
  //       avoidHighways: false,
  //       avoidTolls: false,
  //     };

  //     const service = new window.google.maps.DistanceMatrixService();
  //     service.getDistanceMatrix(request).then((response) => {
  //       // Handle the distance matrix response to find the 5 nearest restaurants
  //       console.log(response);
  //       const distances = response.rows[0].elements.map((element, index) => ({
  //         index,
  //         distance: element?.distance,
  //         duration: element?.duration,
  //       }));

  //       distances.sort((a, b) => a.distance.value - b.distance.value);

  //       //   const nearestRestaurants = distances.slice(0, 5).map((item) => ({
  //       //     distance: item,
  //       //     restaurant: restaurantData[item.index],
  //       //   }));

  //       const nearestRestaurants = distances.map((item) => ({
  //         ...item,
  //         ...restaurantData[item.index],
  //       }));
  //       console.log(nearestRestaurants);
  //       //   setRestaurants(nearestRestaurants);
  //     });
  //   }, [isLoaded, location]);

  useEffect(() => {
    if (!isLoaded || !location || !restaurantData.length) return;

    const restaurantDestinations = restaurantData.map((restaurant) => ({
      lat: restaurant.geoLocation.coordinates[0],
      lng: restaurant.geoLocation.coordinates[1],
    }));

    const request = {
      origins: [{ lat: location.lat, lng: location.lng }],
      destinations: restaurantDestinations,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    const service = new window.google.maps.DistanceMatrixService();
    setLoading(true);
    service
      .getDistanceMatrix(request)
      .then((response) => {
        // Handle the distance matrix response to find the restaurants within 20 km
        const validRestaurants = [];
        console.log(response);

        response.rows[0].elements.forEach((element, index) => {
          const distance = element?.distance;
          if (distance && distance.value <= 20000) {
            // 20 km in meters
            validRestaurants.push({
              ...restaurantData[index],
              distance,
              duration: element?.duration,
            });
          }
        });

        setNearbyRestaurants(validRestaurants);
        console.log(validRestaurants);
        setLoading(false);
      })
      .catch((err) => {
        console.log(request);
        console.log(err);
      });
  }, [isLoaded, location, restaurantData]);

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="my-5">
      <h1 className="mb-2 font-bold text-4xl text-center">
        Nearby Restaurants
      </h1>
      <p className="text-default-510 text-lg text-center mb-5">
        Explore curated lists of top restaurants
      </p>
      {loading ? (
        <div className="gap-6 grid grid-cols-12">
          {[0, 1, 2].map((i) => {
            return <RestaurantCard key={i} dummy />;
          })}
        </div>
      ) : nearbyRestaurants.length ? (
        <div className="gap-6 grid grid-cols-12">
          {nearbyRestaurants.map((i) => {
            return <RestaurantCard key={i._id} {...i} />;
          })}
        </div>
      ) : (
        !loading && (
          <p className="text-default-510 text-lg text-center mb-5">
            No nearby Restaurants Found
          </p>
        )
      )}
      {/* {restaurants.length ? (
        <div className="gap-6 grid grid-cols-12 grid-rows-2">
          {restaurants.map((i) => {
            return <RestaurantCard {...i} />;
          })}
        </div>
      ) : (
        <p className="text-default-510 text-lg text-center mb-5">
          No Restaurants Found
        </p>
      )} */}
    </div>
  );
};

export default GeoLocation;
