import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setIsCollectionModel } from "@/store/slices/uiSlice";
import { saveSideViewImage } from "@/store/slices/watchSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isGreeting } = useSelector((state: any) => state.ui);

  const {
    selectedCase,
    selectedMainBand,
    selectedMainCase,
    selectedBand,
    size,
    totalPrice,
  } = useSelector((state: any) => state.watch);
  const handleSave = () => {
    // Construct search parameters
    const params = new URLSearchParams({
      selectedCase: selectedCase.id || "",
      selectedMainBand: selectedMainBand.id || "",
      selectedMainCase: selectedMainCase.id || "",
      selectedBand: selectedBand.id || "",
      size: size.id || "",
      totalPrice: totalPrice.toString(),
    });
    // Dispatch save action and redirect
    dispatch(saveSideViewImage());
    router.push(`/buy-watch?${params.toString()}`);
  };
  return (
    <header className="py-[24px]   pl-[32px] h-[5.5rem] pr-[20px] flex flex-col md:flex-row justify-between items-center">
    <header className="py-[24px]  pl-[32px] h-[5.5rem] pr-[20px] flex flex-col md:flex-row justify-between items-center">
      <div className="md:w-[88%] w-full flex md:justify-start justify-center">
        <Link href={"/"}>
          <Image
            src={"/images/apple-watch-design-studio-logo.jpg"}
            height={20}
            width={90}
            className="h-auto object-cover"
            alt="apple-watch-logo"
          />
        </Link>
      </div>

      {!isGreeting && (
        <>
          <div className="w-full flex justify-between md:justify-center md:items-center md:gap-[10%] mt-2 md:mt-0">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="flex items-center tracking-tight justify-center md:justify-center font-proTextRegular text-[17px] space-x-1"
              onClick={() => dispatch(setIsCollectionModel(true))}
            >
              <span>Collections</span>
              <span>
                <IoIosArrowDown size={14} />
              </span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 1.5, ease: "easeIn" }}
              className="font-proTextRegular bg-[#0071e3] px-4 py-2 rounded-full text-[14px] text-white md:ml-auto"
              onClick={() => dispatch(saveSideViewImage())} // Dispatch action on save
              onClick={handleSave} // Dispatch action on save
            >
              Save
            </motion.button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;