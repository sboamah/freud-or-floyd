import React, { Component } from "react";
export default class Game extends React.Component {
  data = require("../assets/json/quotes.json");
  jsonString = JSON.stringify(this.data);
  quotes = JSON.parse(this.jsonString);
  quoteNumbers = [];

  componentDidMount() {
    for (let quote of this.quotes) {
      this.quoteNumbers.push(quote.id);
    }
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  render() {
    return (
      <>
        <section>
          {this.quotes.length && (
            <p>{this.quotes[this.getRandomNumber(this.quotes.length)].quote}</p>
          )}
        </section>
        <button>Floyd</button>
        <button>Freud</button>
      </>
    );
  }
}
