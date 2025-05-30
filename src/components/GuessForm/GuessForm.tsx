import { useContext, useEffect, useRef, useState } from "react";
import { scryfall } from "../../utils/scryfall";
import Autocomplete from "../Autocomplete/Autocomplete";
import { comparison } from "../../utils/comparison";
import guessContext from "../../context/GuessContext";
import classes from "./GuessForm.module.css";

const GuessForm = ({ won }: { won: boolean }) => {
  const [guess, setGuess] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [autocomplete, setAutocomplete] = useState<{ selected: boolean, values: string[] }>({ selected: false, values: [] });
  const { setGuesses } = useContext(guessContext);
  const debounceRef = useRef<number | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (won) return;
    setGuess(e.target.value);

    if (e.target.value.length >= 3) {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const values = await scryfall.autocomplete(e.target.value);
        setShowAutocomplete(true);
        setAutocomplete(({ selected: false, values }));
      }, 500);
    }
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (won || !autocomplete.selected) return
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
    <form onSubmit={submitHandler} className={`${classes.form} center-children`}>
      <div>
        <input type="text" onChange={changeHandler} value={guess} placeholder="Card name..." className={`${classes.guessInput} ${autocomplete.values.length > 0 && classes.autocomplete}`} spellCheck={false}/>
        { showAutocomplete && <Autocomplete autocomplete={autocomplete} setAutocomplete={setAutocomplete} setGuess={setGuess}/> }
      </div>
      <input type="submit" value="Guess" className={classes.submitGuess}/>
    </form>
  )
}

export default GuessForm;
