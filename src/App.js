import { useState, useEffect } from "react";
import "./App.css";
import numbers from "./data/numbers50to100.json";
const itemStart = 0;
const itemStop = 50;
const items = numbers
  .slice(itemStart, itemStop)
  .sort((a, b) => 0.5 - Math.random());

export const App = () => {
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [currentItem, setCurrentItem] = useState(items[index]);
  const [errors, setErrors] = useState(0);
  const [acceptedAnswers, setAcceptedAnswers] = useState(0);
  const [text, setText] = useState("");

  const showNextItem = () => {
    if (!showText) {
      setShowText(true);
      return;
    }
    if (currentItem.swedishTranslation.toLowerCase() === text.toLowerCase()) {
      setAcceptedAnswers(acceptedAnswers + 1);
    } else {
      setErrors(errors + 1);
    }

    setText("");
    setShowText(false);
    setIndex(index + 1);
  };

  const showTextButtonPress = () => {
    setShowText(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      showNextItem();
    }
  };

  useEffect(() => {
    if (index < items.length) {
      setCurrentItem(items[index]);
    }
  }, [index]);

  const lastImage = index >= items.length;
  const displayText = `Errors ${errors}, Accepted answers ${acceptedAnswers}`;

  return (
    <div className="container">
      <div className="topLevel">
        {lastImage ? (
          <div className="content">
            <div className="mainContent">
              <div className="largeText">{displayText}</div>
            </div>
          </div>
        ) : (
          <>
            <div className="content">
              <div className="mainContent">
                <div className="largeText">{currentItem.number}</div>
                {showText && (
                  <div className="largeText">
                    {currentItem.swedishTranslation}
                  </div>
                )}
              </div>
              <input
                type="text"
                value={text}
                onKeyPress={(event) => handleKeyPress(event)}
                onChange={(event) => setText(event.target.value)}
              ></input>
              <div className="smallText">
                {index + 1} of {items.length} ({displayText})
              </div>
            </div>
            <div className="buttonGroup">
              <button className="primaryButton" onClick={() => showNextItem()}>
                Next
              </button>
              <button
                className="secondaryButton"
                onClick={() => showTextButtonPress()}
              >
                I forgot
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
