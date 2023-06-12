import React, { useEffect, useRef } from "react";
import "./Input.css";
import { RxCaretDown, RxCaretUp, RxCross1 } from "react-icons/rx";

export const InputCopy = ({
  isOpenInput,
  handleChange,
  matchCount,
  currentIndex,
  highlight,
  handleNext,
  handlePrev,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="input-container">
      <input
        type="text"
        ref={inputRef}
        value={highlight}
        onChange={handleChange}
      />
      <span className="count">
        {highlight.length === 0 ? 0 : currentIndex}/{matchCount}
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
