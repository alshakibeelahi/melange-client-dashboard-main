import { Spin } from "antd";
import React from "react";

const loading = () => {
  return (
    <div>
      {" "}
      <div className="h-screen flex justify-center items-center">
        <Spin tip="Loading" size="large"></Spin>
      </div>
    </div>
  );
};

export default loading;
