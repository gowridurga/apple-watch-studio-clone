import { watchCollections } from "@/data/watchCollections";
import { setIsSideView } from "@/store/slices/uiSlice";
import { setSize } from "@/store/slices/watchSlice";
import { getImageSize } from "@/utils/imageSizes";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SizeSlider = () => {
  const dispatch = useDispatch();

  const { currentBandImage, currentCaseImage, collection, size } =
    useSelector((state: any) => state.watch);
  const {
    selectedBand,
    selectedCase,
    selectedMainBand,
    selectedMainCase,
    collection,
    size,
  } = useSelector((state: any) => state.watch);
  const { isSideview } = useSelector((state: any) => state.ui);

  const sliderRef = useRef<HTMLDivElement>(null);

  const selected = watchCollections
    .find((opt: any) => opt.id === collection)
    ?.sizes.find((s: any) => s.id === size.id);
  const [selectedCaseId, setSelectedCaseId] = useState(selected?.id);
  const handleSizeClick = (option: {
    id: string;
    id: number;
    name: string;
    price: number;
  }) => {
    dispatch(setSize(option));
    // Center the active image in the slider
    const selectedElement = document.getElementById(`watch-${option.id}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    dispatch(setIsSideView(false));
    setSelectedCaseId(option.id);
  };

  useEffect(() => {
    // On mount, center the selected band in the slider
    const selected = watchCollections
      .find((opt: any) => opt.id === collection)
      ?.sizes.find((s: any) => s.id === size.id);

    if (selected && sliderRef.current) {
      const element = document.getElementById(`watch-${selected.id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [size, watchCollections]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        className="relative"
      >
        <div
          className={`h-[53vh] max-h-[508px] min-h-[314px] overflow-y-hidden m-auto w-full relative z-10`}
        >
          <div
            className="overflow-y-hidden h-full whitespace-nowrap overflow-x-scroll pb-[20px] snap-none"
            ref={sliderRef}
          >
            <div
              className="max-h-[592px] h-full p-in-start overflow-x-scroll"
              style={{ overflowX: "scroll" }}
            >
              {watchCollections
                .find((opt: any) => opt.id === collection)
                ?.sizes.map((option: any) => {
                  const { width, height } = getImageSize(option.name);
                  
                  console.log("option:", option);
                  const isSelected = selectedCaseId === option.id;
                  return (
                    <div
                      id={`watch-${option.id}`}
                      className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                      key={option.id}>
                      key={option.id}
                    >
                      <button
                        className="snap-center whitespace-normal flex justify-center items-end m-0 p-0  w-[312px] h-full overflow-hidden bg-none relative text-center"
                        onClick={() => handleSizeClick(option)}>
                        <Image
                          src={currentBandImage}
                          height={1000}
                          width={1000}
                          alt={option.name}
                          className={`object-cover absolute  w-[52vh] `}
                          style={{ maxWidth: `${width}px` }}
                        />
                        <Image
                          src={currentCaseImage}
                          height={1000}
                          width={1000}
                          alt={option.name}
                          className={`object-cover absolute w-[52vh] `}
                          style={{ maxWidth: `${width}px` }}
                        />
                        className={`snap-center whitespace-normal flex justify-center items-end m-0 p-0   h-full overflow-hidden bg-none relative text-center ${
                          isSelected && isSideview
                            ? "md:w-[500px]"
                            : "md:w-[312px]"
                        }`}
                        onClick={() => handleSizeClick(option)}
                      >
                        {isSideview && isSelected ? (
                          <Image
                            src={`/images/sideview/side-${size.id}-${selectedMainCase.id}-${selectedCase.id}-${selectedMainBand.id}-${selectedBand.id}.jpg`}
                            height={1000}
                            width={1000}
                            alt={option.name}
                            className={`object-cover absolute w-[52vh] max-w-[500px]  `}
                          />
                        ) : (
                          <>
                            <Image
                              src={`/images/bands/band-${option.id}-${selectedMainBand.id}-${selectedBand.id}.jpg`}
                              height={1000}
                              width={1000}
                              alt={option.name}
                              className={`object-cover absolute max-w-[500px] w-[52vh]  `}
                            />
                            <Image
                              src={`/images/cases/case-${option.id}-${selectedMainCase.id}-${selectedCase.id}.png`}
                              height={1000}
                              width={1000}
                              alt={option.name}
                              className={`object-cover absolute max-w-[500px] w-[52vh] `}
                            />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SizeSlider;