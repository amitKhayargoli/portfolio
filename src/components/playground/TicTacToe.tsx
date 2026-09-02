"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

type Cell = "X" | "O" | null;
type Board = Cell[];

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): Cell | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function minimax(board: Board, isMaximizing: boolean): number {
  const winner = checkWinner(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, true));
        board[i] = null;
      }
    }
    return best;
  }
}

function computerMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Cell | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const handlePlayerMove = useCallback(
    (index: number) => {
      if (board[index] || winner || !isPlayerTurn) return;

      const newBoard = [...board];
      newBoard[index] = "X";

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setBoard(newBoard);
        setWinner(gameWinner);
        return;
      }

      if (newBoard.every((cell) => cell !== null)) {
        setBoard(newBoard);
        setIsDraw(true);
        return;
      }

      // Computer's turn
      setIsPlayerTurn(false);
      setTimeout(() => {
        const move = computerMove(newBoard);
        if (move !== -1) {
          newBoard[move] = "O";
          const computerWinner = checkWinner(newBoard);
          if (computerWinner) {
            setWinner(computerWinner);
          } else if (newBoard.every((cell) => cell !== null)) {
            setIsDraw(true);
          }
        }
        setBoard([...newBoard]);
        setIsPlayerTurn(true);
      }, 400);
    },
    [board, winner, isPlayerTurn]
  );

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status */}
      <p className="text-sm text-muted">
        {winner
          ? winner === "X"
            ? "You win!"
            : "Computer wins!"
          : isDraw
          ? "Draw!"
          : isPlayerTurn
          ? "Your turn (X)"
          : "Computer thinking..."}
      </p>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2 w-64 h-64">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className="w-full h-full rounded-lg border border-border bg-card hover:bg-card-hover flex items-center justify-center text-2xl font-bold text-foreground transition-colors"
            onClick={() => handlePlayerMove(index)}
            whileTap={{ scale: 0.95 }}
            disabled={!!cell || !!winner || !isPlayerTurn}
          >
            {cell && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cell === "X" ? "text-foreground" : "text-muted"}
              >
                {cell}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <RotateCcw size={14} />
        Play Again
      </button>
    </div>
  );
}
