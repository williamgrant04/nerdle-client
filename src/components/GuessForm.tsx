import { useContext, useEffect, useRef, useState } from "react";
import { scryfall } from "../utils/scryfall";
import Autocomplete from "./Autocomplete";
import { comparison } from "../utils/comparison";
import guessContext from "../context/GuessContext";
import styled from "styled-components";

const GuessForm = ({ won, lost }: { won: boolean, lost: boolean }) => {
  const [guess, setGuess] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [autocomplete, setAutocomplete] = useState<{ selected: boolean, values: string[] }>({ selected: false, values: [] });
  const { setGuesses } = useContext(guessContext);
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (won || lost) return;
    setGuess(e.target.value);
    if (e.target.value.length === 0) {
      setAutocomplete({ selected: false, values: [] });
    }

    if (e.target.value.length >= 3) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const values = await scryfall.autocomplete(e.target.value);
        setShowAutocomplete(true);
        setAutocomplete({ selected: false, values });
      }, 500);
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (won || lost || !autocomplete.selected) return
    setGuess("");
    setAutocomplete(prev => ({ ...prev, selected: false }));
    try {
      // Need some form of validation or actual error handling
      const card = await scryfall.getCardByName(guess);
      const compared = await comparison.compare(card);
      if (card) {
        setGuesses(prev => {
          const updated = [...prev, { guess: { ...card }, comparison: compared }]
          localStorage.setItem("guesses", JSON.stringify(updated));
          return updated
        });
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (autocomplete.values.length === 0) {
      setShowAutocomplete(false);
    }
  }, [autocomplete]);

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <GuessInput $autocomplete={autocomplete.values.length > 0} type="text" onChange={changeHandler} value={guess} placeholder="Card name..." spellCheck={false}/>
        { showAutocomplete && <Autocomplete autocomplete={autocomplete} setAutocomplete={setAutocomplete} setGuess={setGuess}/> }
      </div>
      <SubmitGuess type="submit" value="Guess"/>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  width: fit-content;
  border-radius: 8px;
  box-shadow: 0 2px 4px 2px #000;

  & > div {
    position: relative;
  }
`

const GuessInput = styled.input<{ $autocomplete: boolean }>`
  padding: 0.5rem;
  font-size: 2rem;
  border: 1px solid #ccc;
  border-radius: ${({ $autocomplete }) => $autocomplete ? "8px 0 0 0" : "8px 0 0 8px"};
  transition: border-radius 0.3s;

  &:focus-visible {
    outline: none;
  }
`

const SubmitGuess = styled.input`
  padding: 0.5rem;
  font-size: 2rem;
  background-color: #4CAF50;
  color: white;
  border: 1px solid transparent;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:focus-visible {
    outline: none;
  }
`

export default GuessForm;
