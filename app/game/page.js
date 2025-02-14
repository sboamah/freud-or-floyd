"use client";
import { useState, useEffect } from "react";
import quotesFile from "./quotes.json";
import Link from "next/link";

function Button({ name, onAnswer, feedback }) {
  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 enabled:hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      id={name}
      onClick={onAnswer}
      disabled={feedback}
    >
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
  const [feedback, setFeedback] = useState("");
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

  useEffect(() => {
    getScore();
  })

  const checkAnswer = (name, currentQuote) => {
    if (currentQuote.author.includes(name)) {
      setFeedback("Correct! The answer is " + currentQuote.author + ".");
      setScore(newScore => newScore + 20);
    } else {
      setFeedback("Wrong! The answer is " + currentQuote.author + ".");
    }
  };
  const getScore = () => {
    if (index === maxNumberOfQuotes - 1 && feedback.length) {
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
      setFeedback("");
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
        <div className="flex gap-2" id="feedback">
          {feedback.includes("Correct") && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(0,130,54)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <h4 className="text-green-700">{feedback}</h4>
            </>
          )}
          {feedback.includes("Wrong") && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(193,0,7)"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              <h4 className="text-red-700">{feedback}</h4>
            </>
          )}
        </div>
        <p id="high-score">{highScoreMessage}</p>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button
              name="Freud"
              onAnswer={() => checkAnswer("Freud", currentQuote)}
              feedback={feedback}
            />
            <Button
              name="Floyd"
              onAnswer={() => checkAnswer("Floyd", currentQuote)}
              feedback={feedback}
            />
          </div>
          {index === maxNumberOfQuotes - 1 && feedback ? (
            <Link href="/" rel="noopener noreferrer">
              Play Again
            </Link>
          ) : (
            <button className="flex gap-2 rounded-full border border-solid border-transparent items-center justify-center bg-amber-200 enabled:hover:bg-amber-100 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" name="Next" id="next" onClick={next} disabled={!feedback}>
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
