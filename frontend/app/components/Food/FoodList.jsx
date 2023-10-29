// FoodList.js
import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import FoodCard from "./FoodCard";

const FoodList = ({ loading, foodItems }) => {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        [0, 1, 2, 3].map((i) => (
          <Card key={i} className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ))
      ) : foodItems.length ? (
        foodItems.map((item) => <FoodCard key={item._id} {...item} />)
      ) : (
        <p className="text-default-510 text-lg text-center mb-5 col-span-4">
          No Food Found
        </p>
      )}
    </div>
  );
};

export default FoodList;
