import React from "react";
import Dice1 from "./dice-1.png";
import Dice2 from "./dice-2.png";
import Dice3 from "./dice-3.png";
import Dice4 from "./dice-4.png";
import Dice5 from "./dice-5.png";
import Dice6 from "./dice-6.png";

const diceImg = { 1: Dice1, 2: Dice2, 3: Dice3, 4: Dice4, 5: Dice5, 6: Dice6 };

class Dice extends React.Component {
  render() {
    return (
      <div className="dice-container">
        {<img className="dice-img" src={diceImg[this.props.value]} alt="die" />}
      </div>
    );
  }
}

export default Dice;
