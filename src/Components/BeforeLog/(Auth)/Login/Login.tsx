"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider } from "antd";
import Link from "next/link";
import SubmitButton from "@/Components/Shared/SubmitButton";
import baseAxios from "../../../../../Config";
import Swal from "sweetalert2";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const rememberedEmail: string | null =
      localStorage.getItem("remembered_email");
    const rememberedPassword: string | null = localStorage.getItem(
      "remembered_password"
    );

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
    }
  }, []);

  const onFinish = (values: FieldType) => {
    baseAxios
      .post("/users/sign-in", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.attributes)
            );
            localStorage.setItem("token", response.data.data.accessToken);
            localStorage.setItem("userId", response.data.data.attributes._id);
            window.location.href = "/artist";
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="lg:w-[40%] mx-auto h-screen my-10"
    >
      <Form
        className="lg:w-[80%] mx-2 lg:mx-auto"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className=" text-black">
          {/* Upper for google and facebook login  */}

          <div>
            <div className="flex justify-center mb-14">
              <Link href="/home">
                <Image
                  src={AllImages.logo}
                  className="h-24 w-fit"
                  alt="logo"
                  width={100} // Set a width for Image component
                  height={100} // Set a height for Image component
                />
              </Link>
            </div>
            <div className="mb-12 text-center">
              <h1 className="mb-3 text-3xl font-bold ">
                Great to have you back !
              </h1>
            </div>
            {/* <Button
            className="w-full flex items-center my-3 border-site-te text-xl h-8 text-black font-thin  py-5 "
            style={{
              background: "transparent",
              borderColor: "#363062",
              color: "black",
            }}
          >
            <SiGoogle className="ml-8 mr-2 text-black font-thin bg-transparent hover:bg-transparent" />
            Continue with Google
          </Button>
          <Button
            className="w-full flex items-center my-3 border-site-text text-xl h-8 text-black font-thin  py-5 "
            style={{
              background: "transparent",
              borderColor: "#363062",
              color: "black",
            }}
          >
            <TiSocialFacebook className="ml-7 mr-1 text-3xl text-black font-thin bg-transparent hover:bg-transparent" />
            Continue with Facebook
          </Button> */}
          </div>

          <Divider style={{ borderBlockColor: "gray" }}>
            <span className="text-site-text">Login</span>
          </Divider>
        </div>
        <Typography.Title level={5}>
          <span className="text-site-text">Email</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="username"
          className="mb-6"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="bg-transparent"
            size="large"
            style={{
              background: "transparent",
              color: "black",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <div className="flex justify-between items-baseline ">
          <Typography.Title level={5}>
            <span className="text-black">Password</span>
          </Typography.Title>
          <Link href="/forgot-password">
            <Button
              type="link"
              className="border-b-site-text text-site-text mb-3"
            >
              Forgot
            </Button>
          </Link>
        </div>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="bg-transparent "
            size="large"
            style={{
              background: "transparent",
              color: "black",
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <SubmitButton title={"Sign in"} />
        </Form.Item>
        <div>
          <div className="flex justify-center items-center text-black ">
            <p>New here?</p>
            <Link href="/signup">
              <Button
                type="link"
                style={{
                  color: "#363062",
                  border: "none",
                  borderBottom: "1px solid #363062",
                }}
              >
                Create an account
              </Button>
            </Link>
          </div>
          <Divider style={{ borderBlockColor: "white" }} className="py-2" />
          <p className="text-black text-balance text-center">
            Mélange collects and uses personal data in accordance with our
            Privacy Policy. By creating an account, you agree to our Terms &
            Conditions.
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
