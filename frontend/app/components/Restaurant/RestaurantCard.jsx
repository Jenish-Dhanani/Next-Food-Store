import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";

const RestaurantCard = ({
  _id: id,
  name,
  address,
  city,
  state,
  country,
  image,
  distance,
  duration,
  dummy = false,
}) => {
  if (dummy) {
    return (
      <Card
        className="col-span-12 sm:col-span-4 h-[300px] space-y-5 p-4"
        radius="lg"
      >
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
  return (
    <Card
      as={Link}
      href={`/restaurant/${id}`}
      className="col-span-12 sm:col-span-4 h-[300px] group cursor-pointer"
    >
      <CardHeader className="absolute z-20 top-1 flex-col !items-start">
        <h4 className="text-white font-medium text-large">{name}</h4>
        <p className="text-tiny text-white/60 uppercase font-bold">{address}</p>
        <p className="text-tiny text-white/60 uppercase font-bold">{city}</p>
        <p className="text-tiny text-white/60 uppercase font-bold">{state}</p>
        <p className="text-tiny text-white/60 uppercase font-bold">{country}</p>
        {distance && (
          <p className="text-tiny text-green-400/60 uppercase font-bold">
            {distance.text} Away
          </p>
        )}
        {duration && (
          <p className="text-tiny text-yellow-400/60 uppercase font-bold">
            {duration.text} Est.
          </p>
        )}
      </CardHeader>
      <div className="absolute top-0 z-10 h-full w-full bg-black bg-opacity-70"></div>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover group-hover:scale-110"
        src={image}
      />
    </Card>
  );
};

export default RestaurantCard;
