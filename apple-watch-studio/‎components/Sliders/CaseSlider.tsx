import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cases from "@/data/cases";
import { setCase } from "@/store/slices/watchSlice";
import { getImageSize } from "@/utils/imageSizes";
import { setIsSideView } from "@/store/slices/uiSlice";

const CaseSlider = () => {
  const dispatch = useDispatch();

  // Get the selected case image from the store
  const { currentCaseImage, currentBandImage, size,collection } = useSelector(
    (state: any) => state.watch
  );
  // Get the stored values from the watch slice
  const {
    selectedCase,
    selectedMainBand,
    selectedMainCase,
    selectedBand,
    size,
    collection,
  } = useSelector((state: any) => state.watch);

  const collectionCases = cases.find(
    (col) => col.collectionId === collection
  );
  const collectionCases = cases.find((col) => col.collectionId === collection);

  // Flatten all case variations
  const allVariations = collectionCases?.case.flatMap(
    (caseCategory) => caseCategory.variations
  );
  const { width, height } = getImageSize(size.name);
  const selectedElement = allVariations?.find(
    (variation) => variation.id === selectedCase.id
  );
  const [selectedCaseId, setSelectedCaseId] = useState(selectedElement?.id);
  const { isSideview } = useSelector((state: any) => state.ui);

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCaseClick = (variation: any, mainCase: any) => {
    dispatch(
      setCase({
        subCase: variation,
        mainCase,
      })
    );

    // Center the active image in the slider
    const selectedElement = document.getElementById(`case-${variation.id}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    setSelectedCaseId(variation.id);
    dispatch(setIsSideView(false));
  };

  useEffect(() => {
    // On mount, center the selected case in the slider
    const selectedElement = allVariations?.find(
      (variation) => variation.image === currentCaseImage
    );

    if (selectedElement && sliderRef.current) {
      const element = document.getElementById(`case-${selectedElement.id}`);
      
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentCaseImage, allVariations]);
  }, [selectedCase, allVariations]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1,delay:0.1, ease: "easeOut" }}
        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        className="relative"
      >
        <div
          className={`h-[53vh] max-h-[508px] min-h-[314px] overflow-y-hidden m-auto w-full relative z-10`}>
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
              {/* Show list of cases */}
              {allVariations?.map((variation) => {
                const mainCase = collectionCases?.case.find((c) =>
                  c.variations.some((v) => v.id === variation.id)
                );
                
                const isSelected = selectedCaseId === variation.id;
                return (
                  <div
                    id={`case-${variation.id}`}
                    className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                    key={variation.id}
                  >
                    <button
                      className="snap-center whitespace-normal flex justify-center items-center m-0 p-0 w-[35vh] md:w-[312px] h-full overflow-hidden bg-none relative text-center"
                      className={`transition-transform ease-in-out snap-center whitespace-normal flex justify-center items-center m-0 p-0 w-[35vh] h-full overflow-hidden bg-none relative text-center ${
                        isSelected && isSideview
                          ? "md:w-[500px]"
                          : "md:w-[312px]"
                      }`}
                      onClick={() => handleCaseClick(variation, mainCase)}
                    >
                      <Image
                        src={variation.image}
                        height={1000}
                        width={1000}
                        alt={variation.name}
                        className={`object-cover absolute w-[52vh] max-w-[500px]`}
                      />
                      {isSideview && isSelected ? (
                        <AnimatePresence>
                          <motion.div
                            className={`object-cover absolute w-[52vh] max-w-[500px]`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.5, 
                              ease: "easeOut",
                            }}
                          >
                            <Image
                              src={`/images/sideview/side-${size.id}-${selectedMainCase.id}-${selectedCase.id}-${selectedMainBand.id}-${selectedBand.id}.jpg`}
                              height={1000}
                              width={1000}
                              alt={variation.name}
                            />
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <AnimatePresence>
                          <motion.div
                            className={`object-cover absolute w-[52vh] max-w-[500px]`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                          >
                            <Image
                              src={`/images/cases/case-${size.id}-${mainCase?.id}-${variation.id}.png`}
                              height={1000}
                              width={1000}
                              alt={variation.name}
                            />
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute top-[-4px] z-0 h-auto max-w-[500px] w-[52vh] start-[50%] combinedimage m-auto">
          <Image
            src={currentBandImage}
            height={1000}
            width={1000}
            alt="watch band preview"
            className={`object-cover absolute w-[52vh] max-w-[500px] h-auto`}
          />
        </div>
        {!isSideview && (
          // selected band image only show when sideview is false
          <AnimatePresence>
            <motion.div
              className="absolute top-[-4px] z-0 h-auto max-w-[500px] w-[52vh] start-[50%] combinedimage m-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={`/images/bands/band-${size.id}-${selectedMainBand.id}-${selectedBand.id}.jpg`}
                height={1000}
                width={1000}
                alt="watch band preview"
                className={`object-cover absolute w-[52vh] max-w-[500px] h-auto`}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseSlider;