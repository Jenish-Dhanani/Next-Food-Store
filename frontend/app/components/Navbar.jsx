"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  User,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

const MyNavbar = () => {
  const [mounted, setMounted] = useState(false);
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const handleLogoutClick = (e) => {
    dispatch(logout());
  };
  useEffect(() => {
    if (!userInfo) {
      push("/login");
    }
  }, [push, userInfo]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Selecting cart from global state
  const cart = useSelector((state) => state.cart);

  // Getting the count of items
  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };

  return (
    mounted && (
      <Navbar>
        <NavbarBrand as={Link} href={"/"}>
          FUN
          <p className="font-bold text-inherit">FOOD</p>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          {userInfo && userToken && (
            <NavbarItem>
              <Button color="secondary" as={Link} href="/cart">
                <div className="flex items-center gap-2 text-lg">
                  <HiOutlineShoppingCart /> ({getItemsCount()})
                </div>
              </Button>
            </NavbarItem>
          )}
          {userInfo && userToken ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  name={`${userInfo.fname} ${userInfo.lname}`}
                  description={userInfo.email}
                  avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                  className="cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userInfo?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogoutClick}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="flat">
                Login
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    )
  );
};

export default MyNavbar;
