import { RiUpload2Line } from "react-icons/ri";
const Uploader = () => {
  return (
    <div className="my-10 text-center ">
      <div className="">
        <div className="w-64 p-9  rounded-lg shadow-lg">
          <div
            className=" p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-site-color transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
            id="dropzone"
          >
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <span>
                <RiUpload2Line className="h-10 w-fit" />
              </span>
              <span className="text-gray-600 ">Upload</span>
            </label>
            <input type="file" id="fileInput" className="hidden" multiple />
          </div>
          <div className="mt-6 text-center" id="fileList"></div>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
