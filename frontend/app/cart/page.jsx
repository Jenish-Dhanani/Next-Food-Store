"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/features/cart/cartSlice";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  getKeyValue,
  Button,
  Image,
  ButtonGroup,
} from "@nextui-org/react";
import { HiOutlineTrash } from "react-icons/hi";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "image":
        return (
          <Image
            shadow="sm"
            radius="lg"
            width={100}
            height={50}
            alt={item.name}
            className="w-[100px] h-[50px] object-cover"
            src={item.images[0]}
          />
        );
      case "name":
        return <p>{item.name}</p>;
      case "price":
        return <p>₹ {item.price}</p>;
      case "quantity":
        return <p>{item.quantity}</p>;
      case "actions":
        return (
          <div className="w-full flex gap-2 items-center">
            <ButtonGroup>
              <Button
                isIconOnly
                color="primary"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                +
              </Button>
              <Button
                isIconOnly
                color="primary"
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                -
              </Button>
            </ButtonGroup>
            <Button
              isIconOnly
              color="danger"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              <HiOutlineTrash />
            </Button>
          </div>
        );
      case "total":
        return <p>₹ {item.quantity * item.price}</p>;
      default:
        return cellValue;
    }
  }, []);

  const tableFooter = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        <h2>Grand Total: ₹ {getTotalPrice()}</h2>
      </div>
    );
  }, [cart]);
  return (
    <main className="mt-5 flex flex-col w-full h-auto items-center justify-center">
      <div className="px-6 gap-4 w-full relative max-w-[1024px]">
        {cart.length === 0 ? (
          <h1 className="text-center">Your Cart is Empty!</h1>
        ) : (
          <Table aria-label="Cart table" bottomContent={tableFooter}>
            <TableHeader
              columns={[
                { name: "Image", uid: "image" },
                { name: "Name", uid: "name" },
                { name: "Price", uid: "price" },
                { name: "Quantity", uid: "quantity" },
                { name: "Actions", uid: "actions" },
                { name: "Total", uid: "total" },
              ]}
            >
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={cart}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
};

export default CartPage;
