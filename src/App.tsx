import { useContext, useEffect, useState } from "react"
import Guesses from "./components/Guesses/Guesses"
import GuessForm from "./components/GuessForm/GuessForm"
import axios from "axios"
import guessContext from "./context/GuessContext"

const App = () => {
  const [won, setWon] = useState<boolean>(false)
  const [lost, setLost] = useState<boolean>(false)
  const { guesses, setGuesses } = useContext(guessContext)

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
        setLost(false)
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

  useEffect(() => {
    if ((guesses.length === 20 && !won) || guesses.length > 20) {
      setLost(true)
      console.log("Lost")
    }
  }, [guesses])

  return (
    <>
      <div style={{ width: "100%", height: "25px", display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr" }}>
        <div style={{ width: `${(guesses.length / 20) * 100}%`, gridArea: "1 / 1 / 1 / 2", height: "100%", backgroundColor: won ? "#9bd3ae" : "#f9aa8f", borderRadius: (guesses.length / 20) * 100 === 100 ? "0" : "0 16px 16px 0", transition: "1s" }}></div>
        <p style={{ margin: 0, gridArea: "1 / 1 / 1 / 2" }}>{guesses.length}/20</p>
      </div>
      <GuessForm won={won} lost={lost} />
      <Guesses colorblind={false} setWon={setWon} />
    </>
  )
}

export default App
