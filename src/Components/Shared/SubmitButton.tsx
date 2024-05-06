"use client";
import { Button } from "antd";
import React from "react";

const SubmitButton = ({ title }: { title: any }) => {
  return (
    <Button
      htmlType="submit"
      className="w-full border-none font-bold rounded-none"
      style={{ backgroundColor: "black", color: "white" }}
    >
      {title.toUpperCase()}
    </Button>
  );
};

export default SubmitButton;
