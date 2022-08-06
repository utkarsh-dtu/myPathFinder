import React, { Component } from "react";
import "./Node.css";

// const makeWall = (e) => {
//   const element = document.getElementById(e.target.id);
//   element.className = "node-wall";
// };
class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleCellClick, isStart, isFinish, row, col, isWall } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    return (
      <div
        onClick={() => handleCellClick(row, col)}
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
      ></div>
    );
  }
}

export default Node;
