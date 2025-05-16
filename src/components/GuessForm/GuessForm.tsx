import { useState } from "react";
import { scryfall } from "../../utils/scryfall";
import Autocomplete from "../Autocomplete/Autocomplete";

const GuessForm = () => {
  const [guess, setGuess] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<string[]>([]);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);

    if (e.target.value.length >= 3) {
      setAutocomplete(await scryfall.autocomplete(e.target.value))
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuess("");
    // Submit logic here
  }

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
