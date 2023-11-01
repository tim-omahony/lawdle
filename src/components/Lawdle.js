import React, { useState, useEffect } from "react";
import useLawdle from "../hooks/useLawdle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import keys from "../constants/keys";
import Modal from "./Modal";

export default function Lawdle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } =
    useLawdle(solution);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad keys={keys} usedKeys={usedKeys} />{" "}
      {showModal && (
        <div>
          <Modal isCorrect={isCorrect} solution={solution} turn={turn} />
        </div>
      )}
    </div>
  );
}
