"use client";
import Image from "next/image";
import ModalComponent from "./components/ModalComponent";
import SearchBar from "./components/SearchBar";
import RestaurantWrapper from "./components/Restaurant/RestaurantWrapper";
import FoodCardWrapper from "./components/Food/FoodCardWrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FoodItemForm from "./components/Food/FoodItemForm";
import AddEditFoodItem from "./components/Food/AddEditFoodItem";

export default function Home() {
  const { push } = useRouter();
  const { userToken, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!userToken || !userInfo) {
      push("/login");
    }
  }, []);

  return (
    <main className="mt-5 flex w-full h-auto items-center justify-center">
      <div className="px-6 gap-4 w-full relative max-w-[1024px]">
        <div className="flex items-center justify-between">
          <SearchBar />
          <ModalComponent buttonText="Add Food Item">
            <AddEditFoodItem isEditMode={false} />
          </ModalComponent>
        </div>
        <div>
          <FoodCardWrapper />
        </div>
        <div>
          <RestaurantWrapper />
        </div>
      </div>
    </main>
  );
}
