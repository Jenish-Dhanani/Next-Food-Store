// page.js
"use client";
import FoodList from "@/app/components/Food/FoodList";
import { foodItems } from "@/app/store/features/FoodItem/foodItemActions";
import { restaurantView } from "@/app/store/features/restaurant/restaurantActions";
import { Card, Image, Skeleton } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { id } = useParams();
  const { loading, selectedRestaurant } = useSelector(
    (state) => state.restaurant
  );
  const { loading: foodItemLoading, foodItems: foodList } = useSelector(
    (state) => state.foodItem
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantView(id));
    dispatch(foodItems(id));
  }, []);

  return (
    <main className="mt-5 flex w-full h-auto items-center justify-center">
      <div className="px-6 gap-4 w-full relative max-w-[1024px]">
        <div className="flex flex-col">
          <Image
            width={1000}
            alt="NextUI hero Image with delay"
            isLoading={loading || !selectedRestaurant}
            className="mb-5 h-52 object-cover"
            src={selectedRestaurant?.image}
            fallbackSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="mb-5 mt-5">
            {loading || !selectedRestaurant ? (
              <>
                <Skeleton className="w-3/6 rounded-lg mb-2">
                  <div className="h-12 w-3/6 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg mb-2">
                  <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-1/6 rounded-lg mb-2">
                  <div className="h-3 w-1/6 rounded-lg bg-default-200"></div>
                </Skeleton>
              </>
            ) : (
              <>
                <h1 className="font-medium text-4xl">
                  {selectedRestaurant?.name}
                </h1>
                <p className="font-light text-large">
                  {selectedRestaurant?.address}
                </p>
                <p className="font-light text-large">{`${selectedRestaurant?.city}, ${selectedRestaurant?.state}, ${selectedRestaurant?.country}`}</p>
              </>
            )}
            <p className="text-default-510 text-lg text-center mt-5 mb-5">
              Explore dishes
            </p>
            <FoodList loading={foodItemLoading} foodItems={foodList} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
