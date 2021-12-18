import React from "react";

class Player1 extends React.Component {
  state = { isMyturn: true, CurrentScore: 0, TotalScore: 0 };

  render() {
    return <div> player 1 CurrentScore: {this.state.CurrentScore}</div>;
  }
}

export default Player1;
