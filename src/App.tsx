import { useContext, useEffect, useState } from "react"
import Guesses from "./components/Guesses/Guesses"
import GuessForm from "./components/GuessForm/GuessForm"
import axios from "axios"
import guessContext from "./context/GuessContext"

const App = () => {
  const [won, setWon] = useState<boolean>(false)
  const { setGuesses } = useContext(guessContext)

  useEffect(() => {
    const date = localStorage.getItem("date")
    axios.get("http://localhost:3000/date")
      .then(({ data }) => {
        if (!date || date && new Date(data.date).getUTCDate() === new Date(date).getUTCDate()) return;
        console.info("Date change")
        localStorage.setItem("date", data.date)
        localStorage.setItem("guesses", "[]")
        setGuesses([])
        setWon(false)
      })
      .catch((_error) => {})
  }, [])

  useEffect(() => {
    if (won) {
      console.log("Win flag")
    } else {
      console.log("not won")
    }
  }, [won])

  return (
    <>
      <GuessForm won={won} />
      <Guesses colorblind={false} setWon={setWon} />
    </>
  )
}

export default App
