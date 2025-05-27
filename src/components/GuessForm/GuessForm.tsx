import { useContext, useEffect, useState } from "react";
import { scryfall } from "../../utils/scryfall";
import Autocomplete from "../Autocomplete/Autocomplete";
import { comparison } from "../../utils/comparison";
import guessContext from "../../context/GuessContext";

const GuessForm = () => {
  const [guess, setGuess] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<{ selected: boolean, values: string[] }>({ selected: false, values: [] });
  const { setGuesses } = useContext(guessContext);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);

    if (e.target.value.length >= 3) {
      // ? Add a debounce
      const values = await scryfall.autocomplete(e.target.value);
      // If user changes input before submitting, selected should be false
      setAutocomplete(({ selected: false, values }));
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuess("");
    setAutocomplete(prev => ({ ...prev, selected: false }));
    try {
      // Need some form of validation or actual error handling
      const card = await scryfall.getCardByName(guess);
      const compared = await comparison.compare(card);
      if (card) {
        const set_image = await scryfall.getSetImage(card.set_uri) ?? undefined;
        setGuesses(prev => [...prev, { guess: {...card, set_image }, comparison: compared }]);
      }
    } catch (error) {

    }
  }

  // This should be a ternary on the className of the button
  // because this would need a ref
  useEffect(() => {
    if (autocomplete.selected) {
      // Enable the submit button
    } else {
      // Disable the submit button
    }
  }, [guess])

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input type="text" onChange={changeHandler} value={guess} placeholder="Guess..." />
        <Autocomplete autocomplete={autocomplete} setAutocomplete={setAutocomplete} setGuess={setGuess}/>
      </div>
      <input type="submit" value="Guess" />
    </form>
  )
}

export default GuessForm;
