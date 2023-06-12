import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Input } from "./components/Input/Input";

function AppCopy() {
  const [showInput, setShowInput] = useState(false);
  const [htmlText, setHtmlText] = useState("");
  const [highlight, setHighlight] = useState("");
  const [matchRegex, setMatchRegex] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const htmlRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", detectKeydown, true);
    setHtmlText(htmlRef.current.innerHTML);
    getSelectedHighlightedText();

    return () => {
      document.removeEventListener("keydown", detectKeydown, true);
    };
  }, [currentIndex]);

  const isOpenInput = () => {
    setShowInput((prev) => (prev = !prev));
  };

  const detectKeydown = (e) => {
    if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      isOpenInput();
    }
  };

  const clearHighlight = () => {
    setHighlight("");
    setMatchCount(0);
    setCurrentIndex(0);
    setMatchRegex([]);
    htmlRef.current.innerHTML = htmlText;
  };

  const getHighlightedText = (highlightText) => {
    let count = 0;
    let highlighted;
    const regex = new RegExp(`(?![^<>]*>)(${highlightText})`, "gi");
    setMatchRegex(htmlText.match(regex));
    if (matchRegex) {
      let formattedText;
      highlighted = htmlText.replace(regex, (match, index) => {
        formattedText =
          count === currentIndex
            ? `<span class="highlight selected">${match}</span>`
            : `<span class="highlight">${match}</span>`;
        // formattedText = `<span class="highlight">${match}</span>`;
        count++;
        return formattedText;
      });
      setMatchCount(count);
      htmlRef.current.innerHTML = highlighted;
    }
  };

  const getSelectedHighlightedText = () => {
    const highlightedNodes = htmlRef.current.querySelectorAll(".highlight");
    [...highlightedNodes].forEach((node, index) => {
      node.className = "highlight";

      if (currentIndex === index + 1) {
        node.className = "highlight selected";
      }
    });
    return;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);

    if (value == "" || value == null) {
      setCurrentIndex(0);
      setHighlight("");
      setMatchCount(0);
      setMatchRegex([]);
      // Remove the highlight class from all the spans with the "highlight" class
      const highlightedSpans = document.getElementsByClassName("highlight");
      while (highlightedSpans.length > 0) {
        const span = highlightedSpans[0];
        span.outerHTML = span.innerHTML; // Replace the span tag with its content
      }
      return (htmlRef.current.innerHTML = htmlText);
    }

    setHighlight(value);
    getHighlightedText(value);
  };

  const handleNext = () => {
    if (currentIndex === matchCount) {
      setCurrentIndex(0);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
    getSelectedHighlightedText();
  };

  const handlePrev = () => {
    if (currentIndex <= 1) {
      setCurrentIndex(matchCount + 1);
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
    getSelectedHighlightedText();
  };

  return (
    <>
      {showInput && (
        <Input
          isOpenInput={isOpenInput}
          handleChange={handleChange}
          matchCount={matchCount}
          currentIndex={currentIndex}
          highlight={highlight}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      <div className="main-container" ref={htmlRef}>
        <h1>What is Lorem Ipsum?</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Why do we use it? It is a long
          established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here', making it look like
          readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search
          for 'lorem ipsum' will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
        </p>
        <h1>Where does it come from?</h1>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance.{" "}
        </p>
        <p>
          The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
          from a line in section 1.10.32. The standard chunk of Lorem Ipsum used
          since the 1500s is reproduced below for those interested. Sections
          1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
          also reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </p>
      </div>
    </>
  );
}

export default App;
