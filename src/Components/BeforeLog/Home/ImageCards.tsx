"use client";

import Link from "next/link";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

interface User {
  _id?: string;
}

const ImageCards = () => {
  return (
    <div className="py-20 max-w-6xl mx-auto relative ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <Link href={`/artist`} >
          <div className="bg-white overflow-hidden ">
            <Image
              src={AllImages.preLog.artist}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
        <Link href={`/radio`} >
          <div className="bg-white overflow-hidden ">
            <Image
              src={AllImages.preLog.radio}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
        <Link href={`/record-label`} >
          <div className="bg-white overflow-hidden ">
            <Image
              src={AllImages.preLog.recordLabel}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
        <Link href={`/events`} >
          <div className="bg-white overflow-hidden mt-10 ">
            <Image
              src={AllImages.preLog.events}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
        <Link href={`/party-potraits`} >
          <div className="bg-white overflow-hidden mt-10 ">
            <Image
              src={AllImages.preLog.patrypotrait}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
        <Link href={`/feedback-drone`} >
          <div className="bg-white overflow-hidden mt-10 ">
            <Image
              src={AllImages.preLog.feddrone}
              alt="Profile Picture"
              width={200}
              height={200}
              className="w-full h-full"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ImageCards;
