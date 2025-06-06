import { createContext, useState } from "react";

// Guesses state will contain an object with the guess and the comparison data
const guessContext = createContext({
  guesses: [] as Guess[],
  setGuesses: (() => {}) as React.Dispatch<React.SetStateAction<Guess[]>>,
  endlessGuesses: [] as Guess[],
  setEndlessGuesses: (() => {}) as React.Dispatch<React.SetStateAction<Guess[]>>,
  endlessCard: {} as Card,
  setEndlessCard: (() => {}) as React.Dispatch<React.SetStateAction<Card>>,
})

export const GuessContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [endlessGuesses, setEndlessGuesses] = useState<Guess[]>([])
  const [endlessCard, setEndlessCard] = useState<Card>({} as Card)

  return (
    <guessContext.Provider value={{
      guesses,
      setGuesses,
      endlessGuesses,
      setEndlessGuesses,
      endlessCard,
      setEndlessCard
    }}>
      { children }
    </guessContext.Provider>
  )
}

export default guessContext
