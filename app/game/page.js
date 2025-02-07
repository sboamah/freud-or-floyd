"use client";
import { useState } from "react";
import quotesFile from "./quotes.json";
import Link from "next/link";

function Button({ name, onAnswer, alert }) {
  return (
    <button id={name} onClick={onAnswer} disabled={alert}>
      {name}
    </button>
  );
}
export default function Page() {
  const quotes = quotesFile.quotes;
  const [index, setIndex] = useState(0);
  const [highScoreMessage, setHighScoreMessage] = useState("");
  const maxIndex = 30;
  const minIndex = 0;
  const maxNumberOfQuotes = 5;
  const ranNumbers = (max, min, count) => {
    if (count > max - min + 1) {
      throw new Error(
        "Cannot generate more unique numbers than the range allows"
      );
    }
    const numbers = [];
    while (numbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  };

  const [currentQuote, setCurrentQuote] = useState(
    quotes[ranNumbers(maxIndex, minIndex, maxNumberOfQuotes)[index]]
  );
  const [alert, setAlert] = useState("");
  const [score, setScore] = useState(0);

  const checkAnswer = (name, currentQuote) => {
    if (currentQuote.author.includes(name)) {
      setAlert("Correct! The answer is " + currentQuote.author + ".");
      setScore(score + 20);
    } else {
      setAlert("Wrong! the answer is " + currentQuote.author + ".");
    }
  };
  const getScore = () => {
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("High Score") > 100) {
        localStorage.setItem("highScore", 100);
      }
      if (localStorage.getItem("High Score") !== null) {
        setHighScoreMessage(
          "Current Score: " +
            score +
            "% | Highest Score: " +
            localStorage.getItem("High Score") +
            "%"
        );
      } else {
        setHighScoreMessage(
          "Current Score: " + score + "% | Highest Score: 0%"
        );
      }
    }
  };

  const next = () => {
    if (index === maxNumberOfQuotes - 1) {
      localStorage.setItem("Score", score);
      if (score > localStorage.getItem("High Score")) {
        localStorage.setItem("High Score", score);
      }
    }
    if (index < maxNumberOfQuotes) {
      setIndex((prevIndex) => prevIndex + 1);
      setAlert("");
      setCurrentQuote(
        quotes[ranNumbers(maxIndex, minIndex, maxNumberOfQuotes)[index]]
      );
    } else {
      getScore();
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-col m-[100px]">
        <h1 className="font-serif text-5xl">Freud or Floyd</h1>
        <p>
          Guess if the quote is from the famed philosopher or the brash boxer.
        </p>

        <h3 id="quote">
          {index + 1}. {currentQuote.quote}
        </h3>
        <h4 id="alert">{alert}</h4>
        <p id="high-score">{highScoreMessage}</p>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button
              name="Freud"
              onAnswer={() => checkAnswer("Freud", currentQuote)}
              alert={alert}
            />
            <Button
              name="Floyd"
              onAnswer={() => checkAnswer("Floyd", currentQuote)}
              alert={alert}
            />
          </div>
          {index < maxNumberOfQuotes ? (
            <button name="Next" id="next" onClick={next} disabled={!alert}>
              Next →
            </button>
          ) : (
            <Link href="/" rel="noopener noreferrer">
              Go to Home
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
