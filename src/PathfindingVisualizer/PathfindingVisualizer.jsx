import React, { Component } from "react";
import "./PathfindingVisualizer.css";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Node from "./Node/Node";
import { bfs, dfsHelp } from "../algorithms/dijsktra";

class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startSet: false,
      endSet: false,
      START_NODE_ROW: 0,
      START_NODE_COL: 0,
      FINISH_NODE_ROW: 4,
      FINISH_NODE_COL: 9,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    const makeWall = (row, col) => {
      grid[row][col].isWall = !grid[row][col].isWall;
      console.log(grid);
      this.setState({ ...this.state, grid });
    };

    const setStart = (row, col) => {
      grid[row][col].isStart = true;
      this.setState({
        ...this.state,
        grid,
        startSet: true,
        START_NODE_ROW: row,
        START_NODE_COL: col,
      });
    };

    const setEnd = (row, col) => {
      grid[row][col].isFinish = true;
      this.setState({
        ...this.state,
        grid,
        endSet: true,
        FINISH_NODE_ROW: row,
        FINISH_NODE_COL: col,
      });
    };

    const handleCellClick = (row, col) => {
      console.log("handleCellClick", row, col);
      const { startSet } = this.state;
      const { endSet } = this.state;
      if (!startSet) {
        setStart(row, col);
      } else if (!endSet) {
        setEnd(row, col);
      } else {
        makeWall(row, col);
      }
    };

    const resetGrid = () => {
      const newGrid = getInitialGrid();
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
      this.setState({
        ...this.state,
        grid: newGrid,
        startSet: false,
        endSet: false,
      });
    };
    const handleBfs = () => {
      const {
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL,
      } = this.state;

      const res = bfs(
        grid,
        grid[START_NODE_ROW][START_NODE_COL],
        grid[FINISH_NODE_ROW][FINISH_NODE_COL]
      );

      for (let i = 0; i < res.length; i++) {
        const cur = res[i];
        for (const node of cur) {
          const { row, col } = node;

          setTimeout(() => {
            const element = document.getElementById(`node-${row}-${col}`);
            element.className = "node node-shortest-path";
          }, 50 * i);
        }
      }
    };

    const handleDfs = () => {
      const {
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL,
        grid,
      } = this.state;

      const res = dfsHelp(
        grid,
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL
      );

      console.log(res);
    };
    return (
      <div className="container">
        <div className="messageBox">
          <Typography>
            {this.state.startSet && this.state.endSet ? (
              <h1>"Click on cells to create Walls and run BFS"</h1>
            ) : !this.state.startSet ? (
              <h2>"Click on a cell to select start" </h2>
            ) : (
              <h3>"Click on a cell to select end"</h3>
            )}
          </Typography>
        </div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={handleBfs}
            disabled={!(this.state.startSet && this.state.endSet)}
          >
            Start BFS
          </Button>
          {/*           
          <Button
            onClick={handleDfs}
            disabled={!(this.state.startSet && this.state.endSet)}
          >
            Start DFS
          </Button> */}
          <Button onClick={resetGrid} disabled={false}>
            Reset
          </Button>
        </ButtonGroup>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isWall, isFinish, isStart } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      row={rowIdx}
                      col={nodeIdx}
                      isWall={isWall}
                      handleCellClick={handleCellClick}
                    ></Node>
                  );
                })}{" "}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    let currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
export default PathfindingVisualizer;
