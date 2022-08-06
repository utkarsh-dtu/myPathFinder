const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
export function dfs(grid, sr, sc, er, ec, res) {
  if (sr === er && sc === ec) return;

  grid[sr][sc].isVisited = true;
  res.push([sr, sc, true]);
  for (let d of dirs) {
    const ni = sr + d[0];
    const nj = sc + d[1];
    if (
      ni >= 0 &&
      ni < 20 &&
      nj >= 0 &&
      nj < 50 &&
      !grid[ni][nj].isVisited &&
      !grid[ni][nj].isWall
    ) {
      dfs(grid, ni, nj, er, ec, res);
    }
  }
  res.push([sr, sc, false]);
}

export function dfsHelp(grid, startRow, startCol, endRow, endCol) {
  const res = [];
  dfs(grid, startRow, startCol, endRow, endCol, res);
  return res;
}

export function bfs(grid, start, end) {
  const q = [];

  q.push(start);
  start.isVisited = true;
  let res = [];
  for (let level = 0; q.length !== 0; level++) {
    let size = q.length;
    const curLevel = [];
    while (size > 0) {
      const front = q[0];
      const { row, col } = front;
      curLevel.push(front);
      size -= 1;
      q.shift();
      if (row === end.row && col === end.col) return res;

      for (let d of dirs) {
        const ni = row + d[0];
        const nj = col + d[1];
        if (
          ni >= 0 &&
          ni < 20 &&
          nj >= 0 &&
          nj < 50 &&
          !grid[ni][nj].isVisited &&
          !grid[ni][nj].isWall
        ) {
          const toAppend = {
            ...grid[ni][nj],
            isVisited: true,
          };
          grid[ni][nj].isVisited = true;
          q.push(toAppend);
        }
      }
    }

    res.push(curLevel);
  }

  return res;
}
