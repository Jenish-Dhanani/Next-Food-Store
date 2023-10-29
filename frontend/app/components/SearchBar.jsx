"use client";
import { Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/features/FoodItem/foodItemSlice";
import _debounce from "lodash/debounce";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = _debounce((query) => {
    // Dispatch the action to set the search query in Redux
    dispatch(setSearchQuery(query));
  }, 300); // Adjust the delay (in milliseconds) according to your needs

  useEffect(() => {
    return () => dispatch(setSearchQuery(""));
  }, []);
  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      classNames={{
        base: "max-w-full sm:max-w-[22rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Search by name, category, description"
      size="sm"
      startContent={<HiSearch size={18} />}
      type="search"
    />
  );
};

export default SearchBar;
