import { Button } from "@nextui-org/react";
import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ModalComponent from "../ModalComponent";
import AddEditFoodItem from "./AddEditFoodItem";

const EditFoodItemButton = ({ foodItemDetails }) => {
  return (
    <ModalComponent
      buttonText={<HiOutlinePencilAlt />}
      buttonProps={{ isIconOnly: true, variant: "shadow" }}
    >
      <AddEditFoodItem isEditMode={true} foodItemDetails={foodItemDetails} />
    </ModalComponent>
  );
};

export default EditFoodItemButton;
