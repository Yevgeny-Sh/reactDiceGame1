import React from "react";
import Dice from "./Dice";

class Game extends React.Component {
  rollDice() {
    return 1 + Math.floor(Math.random() * 6);
  }

  handleDiceRoll = () => {
    let newState = {};
    const newTotalp1 =
      this.state.player1.totalScore + this.state.player1.currentScore;
    const newTotalp2 =
      this.state.player2.totalScore + this.state.player2.currentScore;

    if (
      //player1 playes
      this.state.isPlayer1turn &&
      newTotalp1 < this.state.pointsToWin &&
      this.state.player1.currentScore !== 12
    ) {
      newState = {
        dice1: { value: this.rollDice() },
        dice2: { value: this.rollDice() },
        player1: {
          currentScore: this.state.dice1.value + this.state.dice2.value,
          totalScore:
            this.state.player1.totalScore +
            this.state.dice1.value +
            this.state.dice2.value,
        },
      };
    } else if (
      //if player 1 won
      newTotalp1 >= this.state.pointsToWin &&
      this.state.pointsToWin > 0
    ) {
      newState.winner = 1;
      //case player2 is playing
    } else if (
      this.state.player2.totalScore < this.state.pointsToWin &&
      this.state.player2.currentScore !== 12 &&
      !this.state.isPlayer1turn
    ) {
      newState = {
        player2: {
          totalScore:
            this.state.player2.totalScore +
            this.state.dice1.value +
            this.state.dice2.value,
        },
        dice1: { value: this.rollDice() },
        dice2: { value: this.rollDice() },
      };
    } else if (
      //player 2 wins
      this.state.player2.totalScore >= this.state.pointsToWin &&
      this.state.pointsToWin > 0
    ) {
      newState.winner = 2;
      //alert("player 2 wins");
    } else if (
      // player rolled double 6
      this.state.dice1.value === 6 &&
      this.state.dice2.value === 6
    ) {
      alert("double 6, turn change!");
      this.handleHold();
    }
    this.setState(newState);
  };
  handleHold = () => {
    this.setState((prevState) => {
      return {
        isPlayer1turn: !prevState.isPlayer1turn,
      };
    });
  };

  handleChange = (e) => {
    this.setState(() => {
      return {
        pointsToWin: e.target.value,
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  state = {
    isPlayer1turn: true,
    pointsToWin: "",
    winner: "",
    player1: {
      totalScore: 0,
      currentScore: 0,
    },
    player2: {
      totalScore: 0,
      currentScore: 0,
    },
    dice1: { value: this.rollDice() },
    dice2: { value: this.rollDice() },
  };

  render() {
    return (
      <div className="container">
        <h1>my amazing dice game (now with extra bugs!)</h1>
        <h3>instructions:</h3>
        <p> 1.enter score to win in the input field </p>
        <p>2.press roll dice to play</p>
        <p>press hold to hold and change player</p>
        <form>
          <label>target score:</label>
          <input
            type="text"
            value={this.state.pointsToWin}
            onChange={this.handleChange}
          ></input>
          <input
            type="submit"
            onSubmit={this.handleSubmit}
            value="new game"
          ></input>
        </form>
        <button onClick={this.handleDiceRoll}>roll Dice</button>
        dice1:{` ${this.state.dice1.value} `}
        dice2:{` ${this.state.dice2.value} `}
        <div>&nbsp;&nbsp;</div>
        <Dice value={this.state.dice1.value}></Dice>
        <Dice value={this.state.dice2.value}></Dice>
        <div>&nbsp;&nbsp;</div>
        player 1 Score: {this.state.player1.totalScore}
        <button onClick={this.handleHold}>hold</button>
        player 2 Score: {this.state.player2.totalScore}
        {this.state.winner && (
          <div className="winner">
            winner is player number {this.state.winner}{" "}
          </div>
        )}
      </div>
    );
  }
}

export default Game;
