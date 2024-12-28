import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import CaseSlider from "./Sliders/CaseSlider";
import BandSlider from "./Sliders/BandSlider";
import SizeSlider from "./Sliders/SizeSlider";
import WatchInfo from "./WatchInfo";
import Greetings from "./Greetings";
import CollectionModel from "./models/CollectionModel";
import { setIsSideView } from "@/store/slices/uiSlice";

const Studio = () => {
  const { currentCaseImage, currentBandImage, currentSideViewImage } =
  const { selectedCase, selectedMainCase, size, selectedMainBand,selectedBand } =
    useSelector((state: any) => state.watch);
  const { isGreeting, isCollectionModel } = useSelector(
  const { isGreeting, isCollectionModel,isSideview } = useSelector(
    (state: any) => state.ui
  );

  const [sideview, setSideView] = useState(false);
  const { openButton } = useSelector((state: any) => state.button);
 
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {isGreeting && <Greetings />}

        {isCollectionModel && <CollectionModel />}

        <div className="text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: "28rem",
              scale: 2,
              top: "15vh",
            }}
            animate={{
              opacity: 1,
              y: isGreeting ? "28rem" : 0,
              scale: isGreeting ? 2 : 1,
              top: isGreeting ? "15vh" : "4vh",
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.4,
            }}
            className="relative overflow-hidden"
          >
            {openButton === "Size" && <SizeSlider />}
            {openButton === "Case" && <CaseSlider />}
            {openButton === "Band" && <BandSlider />}

            {openButton === null && (
              <div
                className={`h-[45vh] md:h-[50vh] lg:h-[53vh] max-h-[29.88rem] min-h-[18.47rem] m-auto max-w-[300px] md:max-w-[400px] lg:max-w-[500px] w-[42vh] md:w-[48vh] lg:w-[52vh] relative`}
              >
                {/* Default band & case image with animation */}
                {!sideview && (
                {!isSideview && (
                  <>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.7,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={currentBandImage}
                          src={`/images/bands/band-${size.id}-${selectedMainBand.id}-${selectedBand.id}.jpg` }
                          height={1000}
                          width={1000}
                          alt="watch band preview"
                          className="object-cover absolute w-[42vh] md:w-[48vh] lg:w-[52vh] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                        />
                        <Image
                          src={currentCaseImage}
                          src={`/images/cases/case-${size.id}-${selectedMainCase.id}-${selectedCase.id}.png`}
                          height={1000}
                          width={1000}
                          alt="watch case preview"
                          className="object-cover absolute w-[42vh] md:w-[48vh] lg:w-[52vh] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}

                {/* Side view section with animation presence */}
                {sideview && (
                {isSideview && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={currentSideViewImage}
                        src={`/images/sideview/side-${size.id}-${selectedMainCase.id}-${selectedCase.id}-${selectedMainBand.id}-${selectedBand.id}.jpg`}
                        height={1000}
                        width={1000}
                        alt="watch side preview"
                        className="object-cover absolute w-[42vh] md:w-[48vh] lg:w-[52vh] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {!isGreeting && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
            className="m-auto flex flex-col pt-[6vh] text-center justify-center items-center font-proTextRegular text-sm   leading-[1.42]"
          >
            <button
              onClick={() => setSideView(!sideview)}
              onClick={() => dispatch(setIsSideView(!isSideview))}
              className="mb-3 text-[#06c] underline text-xs"
            >
              {sideview ? "Front view" : "Side view"}
              {isSideview ? "Front view" : "Side view"}
            </button>

            <WatchInfo />
            <Footer />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Studio;