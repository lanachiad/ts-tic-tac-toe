import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Logout from "./Logout";
import axios from "axios";
import "../styles/Game.css";

function Game() {
  // if token is missing, reload page to return to Login
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      sessionStorage.clear();
      window.location.reload();
    }
  }, []);

  const initialBoard = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };

  const [currentBoard, setCurrentBoard] = useState(initialBoard);
  const [turn, setTurn] = useState("Your");

  const handleSquareClick = (e) => {
    if (e.currentTarget.innerText === "O") {
      disableButton(e.currentTarget);
      return;
    }
    disableButton(e.currentTarget);
    const row = e.currentTarget.parentNode.id;
    const index = e.currentTarget.id;
    e.currentTarget.innerText = "X";
    updateBoard(row, index);
    setTurn("AI's");
  };

  const updateBoard = (row, index) => {
    currentBoard.board[row][index] = "X";
    sendBoard(currentBoard);
  };

  const disableButton = (button) => {
    button.setAttribute("disabled", "");
  };

  const sendBoard = (board) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine",
        board,
        { headers }
      )
      .then((res) => {
        setTimeout(() => {
          setCurrentBoard(res.data);
          setTurn("Your");
        }, "1000");
      })
      .catch((err) => {
        console.log("ERR: ", err);
      })
      .finally(() => {
        gameLoop(currentBoard);
      });
  };

  const gameLoop = (board) => {
    // check if win conditions are met
    console.log("BOARD.BOARD: ", board.board);

    // TODO: This is insane lol
    // User's win conditions
    if ((board.board[0][0] && board.board[1][1] && board.board[2][2]) === "X") {
      console.log("USER diagnoal win!!!!");
    } else if (
      (board.board[0][2] && board.board[1][1] && board.board[2][0]) === "X"
    ) {
      console.log("USER other diagonal win!!!!!");
    } else if (
      (board.board[0][0] && board.board[0][1] && board.board[0][2]) === "X"
    ) {
      console.log("USER top row win!!!!");
    } else if (
      (board.board[1][0] && board.board[1][1] && board.board[1][2]) === "X"
    ) {
      console.log("USER middle row win!!!!");
    } else if (
      (board.board[2][0] && board.board[2][1] && board.board[2][2]) === "X"
    ) {
      console.log("USER bottom row win!!!!");
    }

    // AI's win conditions
    if ((board.board[0][0] && board.board[1][1] && board.board[2][2]) === "O") {
      console.log("AI diagnoal win!!!!");
    } else if (
      (board.board[0][2] && board.board[1][1] && board.board[2][0]) === "O"
    ) {
      console.log("AI other diagonal win!!!!!");
    } else if (
      (board.board[0][0] && board.board[0][1] && board.board[0][2]) === "O"
    ) {
      console.log("AI top row win!!!!");
    } else if (
      (board.board[1][0] && board.board[1][1] && board.board[1][2]) === "O"
    ) {
      console.log("AI middle row win!!!!");
    } else if (
      (board.board[2][0] && board.board[2][1] && board.board[2][2]) === "O"
    ) {
      console.log("AI bottom row win!!!!");
    }
  };

  return (
    <>
      {turn !== "Your" ? <Loading /> : null}
      <h2>{turn} turn</h2>
      <div className="board">
        {currentBoard.board.map((row, rowI) => (
          <div className="game_row" id={rowI} key={rowI}>
            {row.map((val, valI) => (
              <button
                className="game_square"
                id={valI}
                key={valI}
                onClick={handleSquareClick}
              >
                {val}
              </button>
            ))}
          </div>
        ))}
      </div>
      <Logout />
    </>
  );
}

export default Game;
