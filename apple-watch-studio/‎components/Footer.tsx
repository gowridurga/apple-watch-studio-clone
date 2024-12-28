import { WatchSizeIcon } from "@/assets/WatchSizeIcon";
import React, { useState } from "react";
import {
  setSelectedMainBand,
  setSelectedMainCase,
  setSize,
} from "@/store/slices/watchSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "@/store/slices/buttonSlice";
import { motion } from "framer-motion";
import cases from "@/data/cases";
import bands from "@/data/bands";
import { WatchBandIcon } from "@/assets/WatchBandIcon";
import { WatchCaseIcon } from "@/assets/WatchCaseIcon";
import { watchCollections } from "@/data/watchCollections";
import { setIsSideView } from "@/store/slices/uiSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const {
    collection,
    size,
    selectedCase,
    selectedBand,
    totalPrice,
    selectedMainCase,
    selectedMainBand,
  } = useSelector((state: any) => state.watch);
  const openButton = useSelector((state: any) => state.button.openButton);

  const filteredCases = cases.find((item) => item.collectionId === collection);

  const filteredCBands = bands.find((item) => item.collectionId === collection);

  const handleFooterSizeClick = (option: any) => {
    dispatch(setSize(option));
    dispatch(setIsSideView(false));
  };
  const handleFooterCaseClick = (mainCase: any) => {
    dispatch(
      setSelectedMainCase({
        id: mainCase.id,
        name: mainCase.name,
      })
    );
    dispatch(setIsSideView(false));
  };
  const handleFooterBandClick = (mainBand: any) => {
    dispatch(
      setSelectedMainBand({
        id: mainBand.id,
        name: mainBand.name,
      })
    );
    dispatch(setIsSideView(false));
  };
  return (
    <footer className="bottom-[40px] box-border mt-[0px] md:mt-[72px]  py-[24px]  text-center whitespace-nowrap w-full">
      <div className="min-h-[35px] overflow-x-scroll pb-[5px] flex justify-center w-full">
        <div className="bg-[#e8e8ed] space-x-2 rounded-full items-center flex text-[#1d1d1f] border-none mx-[6px] px-4 sm:px-6 font-proTextRegular text-[14px] sm:text-[16px] md:text-[17px] tracking-[-.022em]">
          <div className="inline-block">
            <WatchSizeIcon />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="space-x-2 sm:space-x-3"
          >
            {openButton === "Size" ? (
              watchCollections
                .find((opt: any) => opt.id === collection)
                ?.sizes.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => dispatch(setSize(option))}
                    onClick={() => handleFooterSizeClick(option)}
                    className={`my-[5px] min-h-[20px] text-[16px] md:text-[17px]  align-middle text-[#1d1d1f] py-[5px] ${
                      size.name === option.id
                      size.id === option.id
                        ? "font-proTextSemibold"
                        : "font-proTextRegular"
                    }`}
                  >
                    {option.name}
                  </button>
                ))
            ) : (
              <button
                onClick={() => dispatch(toggleButton("Size"))}
                onClick={() =>
                  dispatch(toggleButton("Size"), dispatch(setIsSideView(false)))
                }
                className="my-[5px] min-h-[20px] font-proTextRegular text-[16px] md:text-[17px]  align-middle text-[#1d1d1f] py-[5px]"
              >
                Size
              </button>
            )}
          </motion.div>
        </div>

        <div className="bg-[#e8e8ed] space-x-2 rounded-full  items-center flex  text-[#1d1d1f] border-none  mx-[6px] px-4 sm:px-6  font-proTextRegular text-[14px] sm:text-[16px] md:text-[17px] tracking-[-.022em] ">
          <div className="inline-block">
            <WatchCaseIcon />
          </div>
          {openButton === "Case" ? (
            filteredCases?.case.map((mainCase: any) => (
              <button
                key={mainCase.id}
                onClick={() =>
                  dispatch(
                    setSelectedMainCase({
                      id: mainCase.id,
                      name: mainCase.name,
                    })
                  )
                }
                onClick={() => handleFooterCaseClick(mainCase)}
                className={`my-[5px] min-h-[20px] text-[16px] md:text-[17px]  align-middle text-[#1d1d1f] py-[5px] ${
                  selectedMainCase.id === mainCase.id
                    ? "font-proTextSemibold"
                    : "font-proTextRegular"
                }`}
              >
                {mainCase.name}
              </button>
            ))
          ) : (
            <button
              onClick={() => dispatch(toggleButton("Case"))}
              onClick={() =>
                dispatch(toggleButton("Case"), dispatch(setIsSideView(false)))
              }
              className="my-[5px] min-h-[20px]  font-proTextRegular text-[16px] md:text-[17px]   align-middle text-[#1d1d1f]  py-[6px]"
            >
              Case
            </button>
          )}
        </div>

        <div className="bg-[#e8e8ed] space-x-2 rounded-full  items-center flex  text-[#1d1d1f] border-none  mx-[6px] px-4 sm:px-6  font-proTextRegular text-[14px] sm:text-[16px] md:text-[17px] tracking-[-.022em] ">
          <div className="inline-block">
            <WatchBandIcon />
          </div>
          {openButton === "Band" ? (
            filteredCBands?.band.map((mainBand: any) => (
              <button
                key={mainBand.id}
                onClick={() =>
                  dispatch(
                    setSelectedMainBand({
                      id: mainBand.id,
                      name: mainBand.name,
                    })
                  )
                }
                onClick={() => handleFooterBandClick(mainBand)}
                className={`my-[5px] min-h-[20px] px-1 text-[16px] md:text-[17px]  align-middle text-[#1d1d1f] py-[5px] ${
                  selectedMainBand.id === mainBand.id
                    ? "font-proTextSemibold"
                    : "font-proTextRegular"
                }`}
              >
                {mainBand.name}
              </button>
            ))
          ) : (
            <button
              onClick={() => dispatch(toggleButton("Band"))}
              onClick={() =>
                dispatch(toggleButton("Band"), dispatch(setIsSideView(false)))
              }
              className="my-[5px] min-h-[20px]  font-proTextRegular  text-[16px] md:text-[17px]  align-middle text-[#1d1d1f]  py-[6px]"
            >
              Band
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;