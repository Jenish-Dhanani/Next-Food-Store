// AddFoodItem.js
import React from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  ModalContent,
} from "@nextui-org/react";
import FoodItemForm from "./FoodItemForm";

const AddEditFoodItem = ({ isEditMode, foodItemDetails }) => {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            {isEditMode ? "Edit Food Item" : "Add New Food Item"}
          </ModalHeader>
          <ModalBody>
            <FoodItemForm
              isEditMode={isEditMode}
              onClose={onClose}
              foodItemDetails={foodItemDetails}
            />
          </ModalBody>
          <ModalFooter>
            {/* <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default AddEditFoodItem;
