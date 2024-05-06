import Signup from "@/Components/BeforeLog/(Auth)/SignUp/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "User Sign up page",
};

const SignupPage = () => {
  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
