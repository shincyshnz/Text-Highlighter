import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Input } from "./components/Input/Input";

function App() {
  const [showInput, setShowInput] = useState(false);
  const [htmlText, setHtmlText] = useState("");
  const [highlight, setHighlight] = useState("");
  const [matchRegex, setMatchRegex] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);
  const currentIndex = useRef(0);
  const htmlRef = useRef(null);

  // Update the value without triggering a re-render
  const updateCurrentIndex = (newValue) => {
    currentIndex.current = newValue;
  };

  // Access the current value
  const getCurrentIndex = () => {
    return currentIndex.current;
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeydown, true);
    setHtmlText(htmlRef.current.innerHTML);

    return () => {
      document.removeEventListener("keydown", detectKeydown, true);
    };
  }, []);

  const isOpenInput = () => {
    if (showInput) {
      updateCurrentIndex(0);
      setMatchCount(0);
      setMatchIndex(0);
      setHighlight("");
      htmlRef.current.innerHTML = htmlText;
    }
    setShowInput((prev) => !prev);
  };

  const detectKeydown = (e) => {
    if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      isOpenInput();
    }
  };

  const getSelectedHighlightedText = () => {
    const highlightedNodes = htmlRef.current.querySelectorAll(".highlight");
    [...highlightedNodes].forEach((node, index) => {
      node.className = "highlight";

      if (currentIndex.current === index + 1) {
        node.className = "highlight selected";
        node.ref = currentIndex;
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    });
    return;
  };

  const handleChange = (e) => {
    updateCurrentIndex(0);
    setMatchIndex(0);
    setMatchCount(0);

    const highlightText = e.target.value;
    setHighlight(highlightText);

    if (highlightText === "" || highlightText === null) {
      updateCurrentIndex(0);
      setMatchCount(0);
      return (htmlRef.current.innerHTML = htmlText);
    }

    const regex = new RegExp(`(?![^<>]*>)(${highlightText})`, "gi");
    const highlighted = htmlText.replace(regex, (match, index) => {
      if (match) {
        setMatchCount((prev) => prev + 1);
        return `<span class="highlight">${match}</span>`;
      }
    });
    htmlRef.current.innerHTML = highlighted;
  };

  const handleNext = () => {
    updateCurrentIndex(currentIndex.current + 1);

    if (currentIndex.current >= matchCount) {
      updateCurrentIndex(1);
    }
    setMatchIndex(getCurrentIndex());

    getSelectedHighlightedText();
  };

  const handlePrev = () => {
    updateCurrentIndex(currentIndex.current - 1);

    if (currentIndex.current <= 0) {
      updateCurrentIndex(matchCount);
    }
    setMatchIndex(getCurrentIndex());

    getSelectedHighlightedText();
  };

  return (
    <>
      {showInput && (
        <Input
          isOpenInput={isOpenInput}
          handleChange={handleChange}
          highlight={highlight}
          matchCount={matchCount}
          handleNext={handleNext}
          handlePrev={handlePrev}
          matchIndex={matchIndex}
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
