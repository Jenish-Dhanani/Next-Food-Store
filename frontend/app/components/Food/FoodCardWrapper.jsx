// FoodCardWrapper.js
"use client";

import { foodItems } from "@/app/store/features/FoodItem/foodItemActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodList from "./FoodList";

const FoodCardWrapper = () => {
  const dispatch = useDispatch();
  const {
    loading: foodItemLoading,
    foodItems: foodList,
    searchQuery,
  } = useSelector((state) => state.foodItem);

  useEffect(() => {
    dispatch(foodItems());
  }, [searchQuery]);

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="mb-5">
      <p className="text-default-510 text-lg text-center mt-5 mb-5">
        Search results
      </p>
      <FoodList loading={foodItemLoading} foodItems={foodList} />
    </div>
  );
};

export default FoodCardWrapper;
