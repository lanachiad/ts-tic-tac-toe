import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Logout from "./Logout";
import axios from "axios";
import "../styles/Game.css";

function Game() {
  useEffect(() => {
    // if token is missing, reload page to return to Login
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
  const [errMsg, setErrMsg] = useState("");

  const resetGame = () => {
    setCurrentBoard(initialBoard);
    setTurn("Your turn");
    setWinner("");
    setErrMsg("");

    const allSquares = document.getElementsByClassName("game_square");
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].removeAttribute("disabled");
    }
  };

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
    gameLoop(currentBoard.board);
    setTurn("AIs turn");
    if (winner.length === 0) {
      sendBoard(currentBoard);
    }
  };

  const updateBoard = (row, index) => {
    currentBoard.board[row][index] = "X";
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
          gameLoop(res.data.board);
        }, "1000");
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_RESPONSE") {
          setErrMsg("Something went wrong. Please try again!");
        }
      })
      .finally(() => {
        gameLoop(currentBoard.board);
      });
  };

  const checkForDraw = (board) => {
    let flattenedArr = [];

    // loop row
    for (let i = 0; i < board?.length; i++) {
      // loop index
      for (let j = 0; j < board?.length; j++) {
        flattenedArr.push(board[i][j]);
      }
    }

    if (!flattenedArr.includes("")) {
      setWinner("DRAW");
    }
  };

  const gameLoop = (board) => {
    // check for draw
    checkForDraw(board);

    // loop through rows
    for (let i = 0; i < board?.length; i++) {
      // horizontal wins
      if (board[i][0] === board[i][1]) {
        if (board[i][1] === board[i][2]) {
          if (board[i][0] === "O") {
            setWinner("AI WINS");
          } else if (board[i][0] === "X") {
            setWinner("USER WINS");
          }
        }
      }

      // vertical wins
      if (board[0][i] === board[1][i]) {
        if (board[1][i] === board[2][i]) {
          if (board[0][i] === "O") {
            setWinner("AI WINS");
          } else if (board[0][i] === "X") {
            setWinner("USER WINS");
          }
        }
      }

      // diagonal l2r wins
      if (board[0][0] === board[1][1]) {
        if (board[1][1] === board[2][2]) {
          if (board[0][0] === "O") {
            setWinner("AI WINS");
          } else if (board[0][0] === "X") {
            setWinner("USER WINS");
          }
        }
      }

      // diagonal r2l wins
      if (board[0][2] === board[1][1]) {
        if (board[1][1] === board[2][0]) {
          if (board[0][2] === "O") {
            setWinner("AI WINS");
          } else if (board[0][2] === "X") {
            setWinner("USER WINS");
          }
        }
      }
    }
  };

  return (
    <>
      {turn !== "Your turn" ? <Loading /> : null}
      {winner !== "" ? <h2 className="game_winner">{winner}</h2> : null}
      {errMsg.length > 0 ? <p className="game_err">{errMsg}</p> : null}
      <h2>{turn}</h2>
      <div className="board">
        {winner !== "" ? <div className="game_over"></div> : null}

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

      <button className="game_reset" onClick={resetGame}>
        Reset Game
      </button>
      <Logout />
    </>
  );
}

export default Game;
