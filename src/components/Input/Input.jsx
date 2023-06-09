import React, { useEffect, useRef } from "react";
import "./Input.css";
import { RxCaretDown, RxCaretUp, RxCross1 } from "react-icons/rx";

export const Input = ({
  isOpenInput,
  handleChange,
  matchCount,
  currentIndex,
  setCurrentIndex,
  getSelectedHighlightedText,
  // handleNext,
  // handlePrev,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    console.log(currentIndex, "===");
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex >= matchCount - 1) {
      setCurrentIndex(0);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
    // getHighlightedText(highlight);
    getSelectedHighlightedText();
  };

  const handlePrev = () => {
    console.log(currentIndex);

    if (currentIndex <= 0) {
      setCurrentIndex(matchCount - 1);
    }

    setCurrentIndex((prevIndex) => prevIndex - 1);
    console.log(currentIndex);

    // getHighlightedText(highlight);
    getSelectedHighlightedText();
  };

  return (
    <div className="input-container">
      <input type="text" ref={inputRef} onChange={handleChange} />
      <span className="count">
        {currentIndex}/{matchCount}
      </span>
      <button onClick={handleNext}>
        <RxCaretDown />
      </button>
      <button onClick={handlePrev}>
        <RxCaretUp />
      </button>
      <button className="close" onClick={isOpenInput}>
        <RxCross1 />
      </button>
    </div>
  );
};
