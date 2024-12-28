"use client";
import Image from "next/image";
import React from "react";
import {useSearchParams } from "next/navigation"; 
const page = () => {
  const searchParams = useSearchParams();
  // Extract search params
  const selectedCase = searchParams.get("selectedCase");
  const selectedMainBand = searchParams.get("selectedMainBand");
  const selectedMainCase = searchParams.get("selectedMainCase");
  const selectedBand = searchParams.get("selectedBand");
  const size = searchParams.get("size");
  const totalPrice = searchParams.get("totalPrice"); 
  return (
    <div className="bg-[#fafafa] ">
      <div className="m-auto  w-[87%] overflow-hidden ">
        <div className="flex items-start pt-[52px] pb-[22px]">
          <div className="max-w-[640px] ">
            <span className="text-[#b64400] font-proTextSemibold text-[12px] md:text-[17px] leading-[1.17] tracking-[-.022em]">
              New
            </span>
            <h1 className="text-[#1d1d1f] font-proDisplaySemibold text-[40px] md:text-[48px] leading-[1.08] tracking-[-.003em] pb-[8px]">
              Buy Apple Watch 
            </h1>
            <span className="text-[#1d1d1f] text-[14px] font-proTextRegular leading-[1.42] tracking-[-.016em] ">${totalPrice}</span>
          </div>
        </div>
        <div className="flex justify-between mb-[108px]  pt-[12px] pb-[68px] ">
          <div className="bg-white flex items-center h-auto justify-center py-[30px]   md:w-[40%] rounded-[25px]">
            <Image
              src={`/images/sideview/side-${size}-${selectedMainCase}-${selectedCase}-${selectedMainBand}-${selectedBand}.jpg`}
              height={748}
              width={1000}
              alt="apple-watch-banner"
              className="object-cover  h-[100%] max-w-[320px] o"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;