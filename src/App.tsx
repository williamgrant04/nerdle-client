// Libraries
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
// Utils
import { comparison } from "./utils/comparison"
// Components
import Guesses from "./components/Guesses"
import GuessForm from "./components/GuessForm"
import guessContext from "./context/GuessContext"
import InfoModal from "./components/InfoModal"
import SetList from "./components/SetList"
import WinLossModal from "./components/WinLossModal"

const App = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [won, setWon] = useState<{ state: boolean, modal: boolean }>({ state: false, modal: false })
  const [lost, setLost] = useState<{ state: boolean, modal: boolean, card: Card }>({ state: false, modal: false, card: {} as Card })
  const { guesses, setGuesses } = useContext(guessContext)
  const [colorblind, setColorblind] = useState<boolean>(localStorage.getItem("colorblind") === "true" || false)

  useEffect(() => {
    const date = localStorage.getItem("date")
    const day = localStorage.getItem("day")
    axios.get(`${import.meta.env.VITE_API_URL}/date`)
      .then(({ data }) => {
        if (!date || !day) {
          localStorage.setItem("date", data.date);
          localStorage.setItem("day", data.day);
          localStorage.setItem("guesses", "[]");
          setGuesses([])
          return;
        }
        if (date && new Date(data.date).getUTCDate() === new Date(date).getUTCDate()) return;
        console.info("Date change")
        localStorage.setItem("date", data.date)
        localStorage.setItem("day", data.day);
        localStorage.setItem("guesses", "[]")
        setGuesses([])
        setWon({ state: false, modal: false })
        setLost({ state: false, modal: false, card: {} as Card })
      })
      .catch((_error) => {})

    const first = localStorage.getItem("showInfo");
    if (!first) {
      setShowInfo(true);
      localStorage.setItem("showInfo", "false");
    }
  }, [])

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (lastGuess) {
      if (comparison.checkComparison(lastGuess.comparison)) {
        setWon({ state: true, modal: true });
      } else {
        setWon({ state: false, modal: false });
        if (guesses.length >= 2) {
          axios.get(`${import.meta.env.VITE_API_URL}/lost`).then(({ data }) => {
            setLost({ state: true, modal: true, card: data })
          })
        }
      }
    }
  }, [guesses])

  const handleWinLossModal = () => {
    if (won.modal) {
      setWon(prev => ({ ...prev, modal: false }));
    } else if (lost.modal) {
      setLost(prev => ({ ...prev, modal: false }));
    }
  }

  return (
    <>
      <GuessBar>
        <Bar $width={(guesses.length/20) * 100} $won={won.state} />
        <Amount>{guesses.length}/20</Amount>
      </GuessBar>
      <SetList />
      <GuessForm won={won.state} lost={lost.state} />
      <Guesses colorblind={colorblind} />

      <WinLossModal open={ won.modal || lost.modal } setOpen={handleWinLossModal} lossCard={lost.card} />

      <InfoModal open={showInfo} setOpen={setShowInfo} />
      <InfoButton onClick={() => setShowInfo(true)}>
        <span>i</span>
      </InfoButton>
      <Version aria-hidden="true">Version 1.5.10</Version>
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
  z-index: 2;
  color: #ddd;
  mix-blend-mode: difference;
`

const InfoButton = styled.button`
  position: fixed;
  font-family: monospace;
  bottom: 15px;
  right: 15px;
  background-color: #555;
  color: #ddd;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s;

  & > span {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #777;
  }
`

const Version = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  color: #aaa;
  font-size: 0.8rem;
  z-index: 2;
  pointer-events: none;
  opacity: 0.5;
`

export default App
