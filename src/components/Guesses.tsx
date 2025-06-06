import { useContext, useEffect } from "react";
import guessContext from "../context/GuessContext";
import styled from "styled-components";
import Guess from "./Guess";
import settingsContext from "../context/SettingsContext";

const Guesses = () => {
  const { guesses, setGuesses } = useContext(guessContext);
  const { colorblind } = useContext(settingsContext);

  useEffect(() => {
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")!);
    if (storedGuesses && storedGuesses.length > 0) {
      setGuesses(storedGuesses);
    }
  }, []);

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
  flex-direction: column-reverse;
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
