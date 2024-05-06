import UploadDetails from "@/Components/AfterLog/UploadDetails/UploadDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Mélange Profile page",
};

const UploadDetailsPage = () => {
  return (
    <>
      <UploadDetails />
    </>
  );
};

export default UploadDetailsPage;
