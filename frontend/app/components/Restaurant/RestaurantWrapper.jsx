"use client";

import { restaurantList } from "@/app/store/features/restaurant/restaurantActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const RestaurantWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantList());
  }, []);

  const { restaurants, loading } = useSelector((state) => state.restaurant);
  return (
    <div className="my-5">
      <h1 className="mb-2 font-bold text-4xl text-center">Restaurants</h1>
      <p className="text-default-510 text-lg text-center mb-5">
        Explore curated lists of top restaurants
      </p>
      {loading ? (
        <div className="gap-6 grid grid-cols-12">
          {[0, 1, 2].map((i) => {
            return <RestaurantCard key={i} dummy />;
          })}
        </div>
      ) : restaurants.length ? (
        <div className="gap-6 grid grid-cols-12">
          {restaurants.map((i) => {
            return <RestaurantCard key={i._id} {...i} />;
          })}
        </div>
      ) : (
        !loading && (
          <p className="text-default-510 text-lg text-center mb-5">
            No Restaurants Found
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

export default RestaurantWrapper;
