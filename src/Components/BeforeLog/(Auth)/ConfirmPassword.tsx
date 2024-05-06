"use client";

import SubmitButton from "@/Components/Shared/SubmitButton";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import Link from "next/link";
import { GrShieldSecurity } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

export default function ConfirmPassword() {
  const onFinish = (values: any) => {
    const data = {
      password: values.password,
      email: localStorage.getItem("email"),
    };
    baseAxios
      .post("users/reset-password", data, {
        headers: {
          "Content-Type": "application/json",
          "Forget-password":
            "Forget-password " + localStorage.getItem("forget-password-token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("forget-password-token");
          localStorage.removeItem("email");
          Swal.fire({
            icon: "success",
            title: "Password Reset",
            text: res.data.message,
          }).then(() => {
            window.location.href = "/login";
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] lg:w-[30%] w-full mx-2 lg:mx-auto border border-site-text">
        <div className="mb-6 ">
          <div className="flex items-baseline gap-2 text-2xl font-bold mb-4">
            <Link href="/forgot-password">
              <ArrowLeftOutlined />
            </Link>
            <h1 className="font-sans">Set New Password </h1>
          </div>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={5} className="font-sans ">
            <span className="text-black">Enter New Password </span>
          </Typography.Title>
          <Form.Item
            className="text-black"
            name="password"
            rules={[{ required: true, message: "Please Enter new password" }]}
          >
            <Input.Password
              size="large"
              prefix={<GrShieldSecurity className="site-form-item-icon mr-2" />}
              placeholder="Enter New password"
              style={{
                background: "transparent",
                color: "black",
              }}
            />
          </Form.Item>
          <Typography.Title level={5} className="font-sans ">
            <span className="text-black">Confirm Password </span>
          </Typography.Title>
          <Form.Item
            className="text-black"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Re-write new password again!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={
                <RiLockPasswordFill className="site-form-item-icon mr-2" />
              }
              placeholder="Re-enter your password"
              style={{
                background: "transparent",
                color: "black",
              }}
            />
          </Form.Item>

          <Form.Item>
            <SubmitButton title="submit" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
