import { useContext, useEffect } from "react";
import guessContext from "../context/GuessContext";
import { comparison } from "../utils/comparison";
import styled from "styled-components";
import Guess from "./Guess";

const Guesses = ({ colorblind, setWon }: { colorblind: boolean, setWon: React.Dispatch<React.SetStateAction<{ state: boolean, modal: boolean }>> }) => {
  const { guesses, setGuesses } = useContext(guessContext);

  useEffect(() => {
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")!);
    if (storedGuesses && storedGuesses.length > 0) {
      setGuesses(storedGuesses);
    }
  }, []);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (lastGuess) {
      if (comparison.checkComparison(lastGuess.comparison))
        setWon({ state: true, modal: true });
      else
        setWon({ state: false, modal: false });
    }
  }, [guesses])

  return (
    <GuessesWrapper>
      {
        guesses.map(({ guess, comparison }) => (
          <GuessWrapper key={guess.id}>
            <h2>{guess.name}</h2>
            <Guess guess={guess} comparison={comparison} colorblind={colorblind} />
          </GuessWrapper>
        ))
      }
    </GuessesWrapper>
  )
}

const GuessesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const GuessWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: 10px;

  h2 {
    color: #ddd;
    margin: 0 0 10px 0;
    font-size: 2rem;
    font-weight: bold;
  }
`

export default Guesses;
