"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  type FormProps,
  Input,
  Typography,
  Divider,
  Select,
  Checkbox,
} from "antd";
const { Option } = Select;
import Link from "next/link";
import Image from "next/image";
import SubmitButton from "@/Components/Shared/SubmitButton";
import baseAxios from "../../../../../Config";
import Swal from "sweetalert2";
import { AllImages } from "@/assets/AllImages";

type FieldType = {
  fullName: string;
  phoneNumber?: string;
  email?: string;
  type?: string;
  designation?: string;
  about?: string;
  facebook?: string;
  instagram?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
};

const Signup = () => {
  const [hovered, setHovered] = useState(false);

  const handleTypeChange = (checkedValues: any) => {
    setTypes(checkedValues);
  };

  const [types, setTypes] = useState([]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const [isLoading, setLoading] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setLoading(true);
    baseAxios
      .post("users/sign-up", values)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.setItem("signUpToken", res.data.data.signUpToken);
            setLoading(false);
            window.location.href = "/verify/email-verification";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="lg:w-[40%] mx-auto  py-10"
    >
      <Form
        className="llg:w-[80%] mx-2 lg:mx-auto mb-20"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className=" text-black ">
          {/* Upper for google and facebook signup  */}

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
              <h1 className="mb-2 text-3xl font-bold ">Welcome to Mélange</h1>
              <p>Create your account easy with less information.</p>
            </div>
          </div>

          <Divider style={{ borderBlockColor: "gray" }}>
            <span className="text-black">Sign-up</span>
          </Divider>
        </div>

        <Typography.Title level={5}>
          <span className="text-black">Full Name*</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="fullName"
          className="mb-2"
          rules={[{ required: true, message: "Please write your full name!" }]}
        >
          <Input
            placeholder="Enter your name"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Contact Number*</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="phoneNumber"
          className="mb-2"
          rules={[{ required: true, message: "Enter your contact number!" }]}
        >
          <Input
            placeholder="Enter your contact number"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Email*</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="email"
          className="mb-2"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="@gmail.com"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Type*</span>
        </Typography.Title>
        <Form.Item
          name="type"
          className="mb-2"
          rules={[
            { required: true, message: "Please select your account type!" },
          ]}
        >
          <Checkbox.Group>
            <Checkbox value="music-artist">Musical Artist</Checkbox>
            <Checkbox value="visual-artist">Visual Artist</Checkbox>
            <Checkbox value="digital-artist">Digital Artist</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Typography.Title level={5}>
          <span className="text-black">Profession*</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="designation"
          className="mb-2"
          rules={[{ required: true, message: "Please write your profession!" }]}
        >
          <Input
            className="bg-transparent"
            placeholder="Enter your profession"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Address</span>
        </Typography.Title>
        <Form.Item<FieldType> name="address" className="mb-2">
          <Input
            className="bg-transparent"
            placeholder="Enter your address"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">About</span>
        </Typography.Title>
        <Form.Item<FieldType> name="about" className="mb-2">
          <textarea
            placeholder="Write something about you"
            className="w-full border border-b-slate-800 rounded-lg p-2"
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Facebook</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="facebook"
          className="mb-2"
          rules={[
            { required: true, message: "Please Enter your facebook url!" },
          ]}
        >
          <Input
            placeholder="Facebook URL"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Typography.Title level={5}>
          <span className="text-black">Instagram</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="instagram"
          className="mb-2"
          rules={[
            { required: true, message: "Please Enter your Instagram url!" },
          ]}
        >
          <Input
            placeholder="Instagram URL"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <div className="flex justify-between items-baseline ">
          <Typography.Title level={5}>
            <span className="text-black">New Password*</span>
          </Typography.Title>
        </div>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Enter new password!" }]}
        >
          <Input.Password
            minLength={8}
            placeholder="Enter new password"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>
        <div className="flex justify-between items-baseline ">
          <Typography.Title level={5}>
            <span className="text-black">Confirm Password*</span>
          </Typography.Title>
        </div>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Rewrite new password again!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            minLength={8}
            placeholder="Confirm password"
            className="bg-transparent"
            style={{
              background: "transparent",
              color: "black",
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={isLoading}
            htmlType="submit"
            className="w-full border-none font-bold rounded-none"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Create Account
          </Button>
        </Form.Item>
        <div>
          <div className="flex justify-center items-center text-black ">
            <p>Already have an account?</p>
            <Link
              href="/login"
              className="hover:bg-blue-500 hover:border-blue-500 ml-3"
            >
              <Button
                type="link"
                style={{
                  color: "#363062",
                  border: "none",
                  borderBottom: "1px solid #363062",
                  backgroundColor: hovered ? "#363062" : "white",
                }}
              >
                Log in
              </Button>
            </Link>
          </div>
          <Divider style={{ borderBlockColor: "black" }} className="py-2" />
          <p className="text-black text-balance text-center ">
            Mélange collects and uses personal data in accordance with our
            Privacy Policy. By creating an account, you agree to our Terms &
            Conditions.
          </p>
        </div>
      </Form>
    </div>
  );
};
export default Signup;
