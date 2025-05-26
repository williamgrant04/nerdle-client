import { useContext } from "react";
import guessContext from "../../context/GuessContext";

const Guesses = () => {
  const { guesses } = useContext(guessContext);
  return (
    <>
      {
        guesses.map((guess) => (
          <div key={guess.guess.id}>
            <h2>{guess.guess.name}</h2>
            <p>Comparison: {JSON.stringify(guess.comparison)}</p>
          </div>
        ))
      }
    </>
  )
}

export default Guesses;
