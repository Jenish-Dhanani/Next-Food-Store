// "use client";

// // react, next and redux
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// // ui components
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Divider,
//   Image,
//   Input,
//   Link as UiLink,
//   Button,
//   Select,
//   SelectItem,
// } from "@nextui-org/react";

// //form and other
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import toast, { Toaster } from "react-hot-toast";
// import { foodItemSchema } from "@/app/validation";
// import { foodItemCreate } from "@/app/store/features/FoodItem/foodItemActions";

// const AddFoodItemForm = () => {
//   const dispatch = useDispatch();
//   const { push } = useRouter();

//   const {
//     handleSubmit,
//     control,
//     register,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       name: "",
//       description: "",
//       category: "",
//       price: "",
//       restaurantId: "",
//     },
//     resolver: zodResolver(foodItemSchema),
//   });

//   const onSubmit = (data) => {
//     console.log("Form data", data);
//     dispatch(foodItemCreate(data));
//   };

//   const { error, loading } = useSelector((state) => state.auth);
//   const { restaurants } = useSelector((state) => state.restaurant);
//   const { AddItemSuccess } = useSelector((state) => state.foodItem);
//   useEffect(() => {
//     if (AddItemSuccess) {
//       toast.success(`Item Created Successfully!`);
//       reset({
//         name: "",
//         description: "",
//         category: "",
//         price: "",
//         restaurantId: null,
//       });
//     }
//   }, [AddItemSuccess]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   return (
//     <form className="mt-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-2">
//         <Input
//           type="text"
//           label="Name"
//           placeholder="Enter name here"
//           labelPlacement="outside"
//           errorMessage={errors.name && "Name is required"}
//           validationState={errors.name ? "invalid" : "valid"}
//           {...register("name", { required: true })}
//         />
//       </div>
//       <div className="mb-2">
//         <Input
//           type="text"
//           label="Description"
//           placeholder="Enter description here"
//           labelPlacement="outside"
//           errorMessage={errors.description && "Description is required"}
//           validationState={errors.description ? "invalid" : "valid"}
//           {...register("description", { required: true })}
//         />
//       </div>
//       <div className="mb-2">
//         <Input
//           type="text"
//           label="Category"
//           placeholder="Enter category here"
//           labelPlacement="outside"
//           errorMessage={errors.category && "Category is required"}
//           validationState={errors.category ? "invalid" : "valid"}
//           {...register("category", { required: true })}
//         />
//       </div>
//       <div className="mb-2">
//         <Input
//           type="number"
//           label="Price"
//           placeholder="Enter price here"
//           labelPlacement="outside"
//           errorMessage={errors.price && "Price is required"}
//           validationState={errors.price ? "invalid" : "valid"}
//           startContent={"₹"}
//           {...register("price", {
//             required: true,
//             valueAsNumber: true, // This ensures that the input value is treated as a number
//           })}
//         />
//       </div>
//       <div className="mb-2">
//         <Select
//           labelPlacement="outside"
//           label="Restaurant"
//           placeholder="Select restaurant"
//           errorMessage={errors.restaurantId && "Restaurant is required"}
//           validationState={errors.restaurantId ? "invalid" : "valid"}
//           {...register("restaurantId", { required: true })}
//         >
//           {restaurants.map((i) => (
//             <SelectItem key={i._id} value={i._id}>
//               {i.name}
//             </SelectItem>
//           ))}
//         </Select>
//       </div>
//       <div className="mt-6">
//         <Button color="primary" type="submit" isLoading={loading} fullWidth>
//           Save
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default AddFoodItemForm;

// FoodItemForm.js
"use client";
// FoodItemForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Link as UiLink,
  Button,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { foodItemSchema } from "@/app/validation";
import {
  foodItemCreate,
  foodItemEdit,
} from "@/app/store/features/FoodItem/foodItemActions";
import { resetSuccess } from "@/app/store/features/FoodItem/foodItemSlice";

const FoodItemForm = ({ isEditMode, onClose, foodItemDetails }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      restaurantId: "",
    },
    resolver: zodResolver(foodItemSchema),
  });

  useEffect(() => {
    // Pre-fill form fields when in edit mode
    if (isEditMode && foodItemDetails) {
      console.log(foodItemDetails);
      setValue("name", foodItemDetails.name);
      setValue("description", foodItemDetails.description);
      setValue("category", foodItemDetails.category);
      setValue("price", foodItemDetails.price);
      setValue("restaurantId", foodItemDetails.restaurantId);
      setValue("image", foodItemDetails.images[0]);
    }
  }, [isEditMode, foodItemDetails]);

  const onSubmit = (data) => {
    console.log("Form data", data);
    if (isEditMode) {
      // Dispatch update action
      dispatch(
        foodItemEdit({
          id: foodItemDetails.id,
          data: { ...data, availability: isSelected ? "Yes" : "No" },
        })
      );
    } else {
      // Dispatch create action
      dispatch(
        foodItemCreate({
          ...data,
          images: [data.image],
        })
      );
    }
  };

  const { error, loading } = useSelector((state) => state.auth);
  const { restaurants } = useSelector((state) => state.restaurant);
  const { AddItemSuccess, EditItemSuccess } = useSelector(
    (state) => state.foodItem
  );

  useEffect(() => {
    console.log({ AddItemSuccess, EditItemSuccess });
    if (AddItemSuccess || EditItemSuccess) {
      toast.success(
        `${isEditMode ? "Item Updated" : "Item Created"} Successfully!`
      );
      if (!isEditMode) {
        reset({
          name: "",
          description: "",
          category: "",
          price: "",
          image: "",
          restaurantId: null,
        });
      }
      onClose();
    }
    return () => dispatch(resetSuccess());
  }, [AddItemSuccess, EditItemSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [isSelected, setIsSelected] = useState(foodItemDetails?.availability);

  return (
    <form className="mt-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Input
          type="text"
          label="Name"
          placeholder="Enter name here"
          labelPlacement="outside"
          errorMessage={errors.name && "Name is required"}
          validationState={errors.name ? "invalid" : "valid"}
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          label="Description"
          placeholder="Enter description here"
          labelPlacement="outside"
          errorMessage={errors.description && "Description is required"}
          validationState={errors.description ? "invalid" : "valid"}
          {...register("description", { required: true })}
        />
      </div>
      <div className="mb-2">
        <Input
          type="text"
          label="Category"
          placeholder="Enter category here"
          labelPlacement="outside"
          errorMessage={errors.category && "Category is required"}
          validationState={errors.category ? "invalid" : "valid"}
          {...register("category", { required: true })}
        />
      </div>
      <div className="mb-2">
        <Input
          type="number"
          label="Price"
          placeholder="Enter price here"
          labelPlacement="outside"
          errorMessage={errors.price && "Price is required"}
          validationState={errors.price ? "invalid" : "valid"}
          startContent={"₹"}
          {...register("price", {
            required: true,
            valueAsNumber: true, // This ensures that the input value is treated as a number
          })}
        />
      </div>
      {isEditMode && (
        <div className="mb-2">
          <Switch isSelected={isSelected} onValueChange={setIsSelected}>
            Availability
          </Switch>
        </div>
      )}
      {!isEditMode && (
        <div className="mb-2">
          <Input
            type="text"
            label="Image Url"
            placeholder="Enter image url here"
            labelPlacement="outside"
            errorMessage={errors.image && "Image url is required"}
            validationState={errors.image ? "invalid" : "valid"}
            {...register("image", {
              required: true,
            })}
          />
        </div>
      )}
      {!isEditMode && (
        <div className="mb-2">
          <Select
            labelPlacement="outside"
            label="Restaurant"
            placeholder="Select restaurant"
            errorMessage={errors.restaurantId && "Restaurant is required"}
            validationState={errors.restaurantId ? "invalid" : "valid"}
            {...register("restaurantId", { required: true })}
          >
            {restaurants.map((i) => (
              <SelectItem key={i._id} value={i._id}>
                {i.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}

      <div className="mt-6">
        <Button color="primary" type="submit" isLoading={loading} fullWidth>
          {isEditMode ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default FoodItemForm;
