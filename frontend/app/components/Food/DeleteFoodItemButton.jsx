import { foodItemDelete } from "@/app/store/features/FoodItem/foodItemActions";
import { resetSuccess } from "@/app/store/features/FoodItem/foodItemSlice";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const DeleteFoodItemButton = ({ id }) => {
  const dispatch = useDispatch();
  const { DeleteItemSuccess } = useSelector((state) => state.foodItem);

  const handleDelete = () => {
    dispatch(foodItemDelete(id));
  };

  useEffect(() => {
    if (DeleteItemSuccess) {
      dispatch(resetSuccess());
    }
  }, [DeleteItemSuccess]);

  return (
    <Button color="danger" isIconOnly variant="shadow" onClick={handleDelete}>
      <HiOutlineTrash />
    </Button>
  );
};

export default DeleteFoodItemButton;
