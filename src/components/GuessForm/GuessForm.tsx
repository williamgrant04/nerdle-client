import { useEffect, useState } from "react";
import { scryfall } from "../../utils/scryfall";
import Autocomplete from "../Autocomplete/Autocomplete";

const GuessForm = () => {
  const [guess, setGuess] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<{ selected: boolean, values: string[] }>({ selected: false, values: [] });

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);

    if (e.target.value.length >= 3) {
      const values = await scryfall.autocomplete(e.target.value);
      // If user changes input before submitting, selected should be false
      setAutocomplete(({ selected: false, values }));
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuess("");
    setAutocomplete(prev => ({ ...prev, selected: false }));
    // Submit logic here
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
