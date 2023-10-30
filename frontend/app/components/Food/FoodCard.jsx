import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Skeleton,
  Chip,
} from "@nextui-org/react";
import AddToCartButton from "./AddToCartButton";
import EditFoodItemButton from "./EditFoodItemButton";
import DeleteFoodItemButton from "./DeleteFoodItemButton";

const FoodCard = ({
  _id: id,
  name,
  description,
  category,
  price,
  availability,
  images,
  restaurantId,
  dummy = false,
}) => {
  const _availability = availability === "Yes" ? true : false;
  if (dummy) {
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
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
    );
  }
  const slides = Array.from({ length: 1000 }).map(
    (el, index) => `Slide ${index + 1}`
  );
  return (
    <Card shadow="sm" className="select-none">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="w-full object-cover h-[140px]"
          src={images[0]}
        />
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full flex text-small justify-between items-center gap-2 text-left">
          <b>{name}</b>
          <p className="text-default-500 whitespace-nowrap">
            ₹ <span className="text-2xl font-semibold">{price}</span>
          </p>
        </div>
        <div className="w-full text-small text-left">
          <p className="text-default-500 line-clamp-3">{description}</p>
        </div>
        <div className="w-full text-small text-left">
          <p className="text-default-500">Category: {category}</p>
        </div>
        <div className="w-full text-small text-left">
          <Chip color={_availability ? "success" : "danger"}>
            {_availability ? "Available" : "Not Available"}
          </Chip>
        </div>
      </CardFooter>
      <CardFooter>
        <div className="w-full flex gap-2">
          <EditFoodItemButton
            foodItemDetails={{
              id,
              name,
              description,
              category,
              price,
              availability: _availability,
              images,
              restaurantId,
            }}
          ></EditFoodItemButton>
          <DeleteFoodItemButton id={id}></DeleteFoodItemButton>
        </div>
      </CardFooter>
      <CardFooter>
        <div className="w-full">
          <AddToCartButton
            item={{
              id,
              name,
              description,
              category,
              price,
              availability,
              images,
            }}
            disabled={!_availability}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
