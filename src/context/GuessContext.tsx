import { createContext, useState } from "react";

// Guesses state will contain an object with the guess and the comparison data
const guessContext = createContext({
  guesses: [] as Guess[],
  setGuesses: (() => {}) as React.Dispatch<React.SetStateAction<Guess[]>>,
})

export const GuessContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [guesses, setGuesses] = useState<Guess[]>([])

  return (
    <guessContext.Provider value={{
      guesses,
      setGuesses
    }}>
      { children }
    </guessContext.Provider>
  )
}

export default guessContext
