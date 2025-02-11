"use client";
import { useState, useEffect } from "react";
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
  const maxIndex = 30;
  const minIndex = 0;
  const maxNumberOfQuotes = 5;
  const [index, setIndex] = useState(0);
  const [highScoreMessage, setHighScoreMessage] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [currentQuote, setCurrentQuote] = useState("");
  const [alert, setAlert] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const numbers = [];
    while (numbers.length < 5) {
      const ranNum = Math.floor(Math.random() * (maxIndex - minIndex + 1));
      if (!numbers.includes(ranNum)) {
        numbers.push(ranNum);
      }
    }
    setRandomNumbers(numbers);
  }, []);

  useEffect(() => {
    setCurrentQuote(quotes[randomNumbers[index]]);
  }, [index, randomNumbers, quotes]);

  const checkAnswer = (name, currentQuote) => {
    if (currentQuote.author.includes(name)) {
      setAlert("Correct! The answer is " + currentQuote.author + ".");
      setScore(score + 20);
    } else {
      setAlert("Wrong! the answer is " + currentQuote.author + ".");
    }
    getScore();
  };
  const getScore = () => {
    if (index === maxNumberOfQuotes - 1) {
      if (localStorage.getItem("High Score") > 100) {
        localStorage.setItem("High Score", 100);
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
    if (index < maxNumberOfQuotes - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setAlert("");
    }
    if (index === maxNumberOfQuotes - 1) {
      localStorage.setItem("Score", score);
      if (score > localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", score);
      }
    }
   
  };

  return (
    <>
      <div className="flex gap-4 flex-col m-[100px]">
        <h1 className="font-serif text-5xl">Freud or Floyd</h1>
        <p>
          Guess if the quote is from the famed philosopher or the brash boxer.
        </p>

        {randomNumbers.length > 0 && currentQuote ? (
          <h3 id="quote">
            {index + 1}. {currentQuote.quote}
          </h3>
        ) : (
          <h3>Loading...</h3>
        )}
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
          {index === maxNumberOfQuotes - 1 && alert ? (
            <Link href="/" rel="noopener noreferrer">
              Play Again
            </Link>
          ) : (
            <button name="Next" id="next" onClick={next} disabled={!alert}>
              Next →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
