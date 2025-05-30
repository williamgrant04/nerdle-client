import { useContext, useEffect, useState } from "react"
import Guesses from "./components/Guesses/Guesses"
import GuessForm from "./components/GuessForm/GuessForm"
import axios from "axios"
import guessContext from "./context/GuessContext"
import styled from "styled-components"

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
      <GuessBar>
        <Bar $width={(guesses.length/20) * 100} $won={won}/>
        <Amount>{guesses.length}/20</Amount>
      </GuessBar>
      <GuessForm won={won} lost={lost} />
      <Guesses colorblind={false} setWon={setWon} />
    </>
  )
}

const GuessBar = styled.div`
  width: 100%;
  height: 25px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
`

const Bar = styled.div<{ $width: number, $won: boolean }>`
  width: ${({ $width }) => `${$width}%`};
  grid-area: 1 / 1 / 1 / 2;
  height: 100%;
  background-color: ${({ $won }) => ($won ? "#9bd3ae" : "#f9aa8f")};
  border-radius: ${({ $width }) => ($width === 100 ? "0" : "0 16px 16px 0")};
  transition: 1s;
  box-shadow: 0 2px 4px rgba(0, 0, 0);
`

const Amount = styled.p`
  margin: 0;
  grid-area: 1 / 1 / 1 / 2;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  mix-blend-mode: difference;
`

export default App
