"use client";

import { useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/app/store/features/cart/cartSlice";

const AddToCartButton = ({ item, disabled }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const isInCart = cart.some((cartItem) => cartItem.id === item.id);
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);

  const [showQuantity, setShowQuantity] = useState(isInCart);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const handleAddToCart = () => {
    if (isInCart) {
      setQuantity(quantity + 1);
      dispatch(incrementQuantity(item.id));
    } else {
      setShowQuantity(true);
      dispatch(addToCart(item));
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decrementQuantity(item.id));
    }
  };

  return (
    <div className="w-full flex justify-center">
      {showQuantity ? (
        <div className="w-full max-w-[150px] flex justify-between items-center">
          <Button isIconOnly color="primary" onClick={handleDecrement}>
            -
          </Button>
          <Chip variant="bordered" size="lg" className="h-full">
            {quantity}
          </Chip>
          <Button isIconOnly color="primary" onClick={handleIncrement}>
            +
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <Button
            fullWidth
            color="primary"
            isDisabled={disabled}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
