import { useState } from "react";

const GuessForm = () => {
  const [guess, setGuess] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);

    if (e.target.value.length >= 3) {
      // Autocomplete logic here
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuess("");
    // Submit logic here
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" onChange={changeHandler} value={guess} placeholder="Guess..." />
      <input type="submit" value="Guess" />
    </form>
  )
}

export default GuessForm;
