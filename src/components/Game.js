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
  const [turn, setTurn] = useState("Your turn");
  const [winner, setWinner] = useState("");

  const resetGame = (e) => {
    setCurrentBoard(initialBoard);
  }

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
    setTurn("AIs turn");
  };

  const updateBoard = (row, index) => {
    currentBoard.board[row][index] = "X";
    gameLoop(currentBoard.board);
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
          setTurn("Your turn");
        }, "1000");
        gameLoop(currentBoard.board);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const gameLoop = (board) => {
    // check for draw

    if (board.includes("")) {
      setWinner("DRAW");
    }

    // loop through rows
    for (let i = 0; i < board.length; i++) {
      // horizontal wins
      if (board[i][0] === board[i][1]) {
        if (board[i][1] === board[i][2]) {
          if (board[i][0] === "X") {
            setWinner("USER WINS -- HOR");
          } else if (board[i][0] === "O") {
            setWinner("AI WINS -- HOR");
          }
        }
      }

      // vertical wins
      if (board[0][i] === board[1][i]) {
        if (board[1][i] === board[2][i]) {
          if (board[0][i] === "X") {
            setWinner("USER WINS - VERT");
          } else if (board[0][i] === "O") {
            setWinner("AI WINS - VERT");
          }
        }
      }

      // diagonal l2r wins
      if (board[0][0] === board[1][1]) {
        if (board[1][1] === board[2][2]) {
          if (board[0][0] === "X") {
            setWinner("USER WINS DIAG L2R");
          } else if (board[0][0] === "O") {
            setWinner("AI WINS -- DIAG L2R");
          }
        }
      }

      // diagonal r2l wins
      if (board[0][2] === board[1][1]) {
        if (board[1][1] === board[2][0]) {
          if (board[0][2] === "X") {
            setWinner("USER WINS DIAG R2L");
          } else if (board[0][2] === "O") {
            setWinner("AI WINS -- DIAG R2L");
          }
        }
      }
    }
  };

  return (
    <>
      {turn !== "Your turn" ? <Loading /> : null}
      {winner !== "" ? <h2 className="game_winner">{winner}</h2> : null}
      <h2>{turn}</h2>
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
      <button className="game_reset" onClick={resetGame}>Reset Game</button>
      <Logout />
    </>
  );
}

export default Game;
