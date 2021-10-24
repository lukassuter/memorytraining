import { useState, useEffect } from "react";
import "./App.css";
import numbers from "./data/numbers.json";

export const App = () => {
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [currentItem, setCurrentItem] = useState(numbers[0]);
  const [errors, setErrors] = useState([]);
  const [acceptedAnswers, setAcceptedAnswers] = useState([]);
  const [text, setText] = useState("");
  const startTime = Date.now();
  const [elapsedTime, setElapsedTime] = useState();
  const [startIndex, setStartIndex] = useState();
  const [numberOfItems, setNumberOfItems] = useState();
  const [shownNumbers, setShownNumbers] = useState([]);

  useEffect(() => {
    setStartIndex(0);
    setNumberOfItems(10);
  }, []);

  useEffect(() => {
    if (startIndex < 0 || numberOfItems + startIndex > 100) {
      return;
    }
    const items = numbers
      .slice(startIndex, startIndex + numberOfItems)
      .sort(() => 0.5 - Math.random());
    setShownNumbers(items);
  }, [numberOfItems, startIndex]);

  useEffect(() => {
    if (!shownNumbers <= 0) {
      return;
    }
    setCurrentItem(shownNumbers[index]);
  }, [index, shownNumbers]);

  const lastImage = index >= shownNumbers.length;
  const displayText = `Errors ${errors.length}, Accepted answers ${acceptedAnswers.length}`;

  const showNextItem = () => {
    if (!showText) {
      setShowText(true);
      return;
    }
    if (currentItem.swedishTranslation.toLowerCase() === text.toLowerCase()) {
      setAcceptedAnswers([...acceptedAnswers, currentItem]);
    } else {
      setErrors([...errors, currentItem]);
    }

    setText("");
    setShowText(false);
    setIndex(index + 1);

    const lastImage = index >= shownNumbers.length - 1;
    if (lastImage) {
      const secondsSinceStart = (Date.now() - startTime) / 1000;
      setElapsedTime(`${secondsSinceStart} seconds`);
    }
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
    if (index < shownNumbers.length) {
      setCurrentItem(shownNumbers[index]);
    }
  }, [index, shownNumbers]);

  return (
    <div className="container">
      <div className="topLevel">
        {lastImage ? (
          <div className="content">
            <div className="mainContent">
              <div className="largeText">{displayText}</div>
              <div>
                <div>Total time: {elapsedTime}</div>
                <br />
                <div>Errors</div>
                {errors.map((error) => (
                  <div className="error-items">
                    {error.number} - {error.swedishTranslation}
                  </div>
                ))}
                <br />
                <div>Correct</div>
                {acceptedAnswers.map((acceptedAnswer) => (
                  <div className="error-items">
                    {acceptedAnswer.number} -{" "}
                    {acceptedAnswer.swedishTranslation}
                  </div>
                ))}
                <br />
              </div>
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
                autoFocus={true}
                type="text"
                value={text}
                onKeyPress={(event) => handleKeyPress(event)}
                onChange={(event) => setText(event.target.value)}
              ></input>
              <div className="smallText">
                {index + 1} of {shownNumbers.length} ({displayText})
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
              <div>Start index</div>
              <input
                type="number"
                value={startIndex}
                onChange={(event) =>
                  setStartIndex(parseInt(event.target.value))
                }
              ></input>
              <div>Number of items</div>
              <input
                type="number"
                value={numberOfItems}
                onChange={(event) =>
                  setNumberOfItems(parseInt(event.target.value))
                }
              ></input>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
