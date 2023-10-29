"use client";

// react, next and redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signinUser } from "../store/features/auth/authActions";

// ui components
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
} from "@nextui-org/react";
import { HiMail, HiEye } from "react-icons/hi";

//form and other
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "../validation/index";
import toast, { Toaster } from "react-hot-toast";

const loginPage = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data", data);
    dispatch(signinUser(data));
  };

  const { userToken, userInfo, error, loading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (userToken && userInfo) {
      push("/");
      toast.success(`Welcome ${userInfo.fname} ${userInfo.lname}`);
    }
  }, [push, userInfo, userToken]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden px-4">
      <Card className="w-full md:max-w-md m-auto">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col w-full py-3">
            <h1 className="text-4xl font-bold text-center">Login</h1>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form
            className="mt-6"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-2">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                labelPlacement="outside"
                startContent={
                  <HiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                errorMessage={errors.email && "Email is required"}
                validationState={errors.email ? "invalid" : "valid"}
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-2">
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                labelPlacement="outside"
                startContent={
                  <HiEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                errorMessage={errors.password && "Password is required"}
                validationState={errors.password ? "invalid" : "valid"}
                {...register("password", { required: true })}
              />
            </div>
            <div className="mt-6">
              <Button
                color="primary"
                type="submit"
                isLoading={loading}
                fullWidth
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <UiLink as={Link} showAnchorIcon href="/signup">
            Don't Have an Account? Sign Up
          </UiLink>
        </CardFooter>
      </Card>
    </div>
  );
};

export default loginPage;
