import { useContext, useEffect, useState } from "react"
import Guesses from "./components/Guesses"
import GuessForm from "./components/GuessForm"
import axios from "axios"
import guessContext from "./context/GuessContext"
import styled from "styled-components"
import Guess from "./components/Guess"
import ReactModal from "react-modal"
import { comparison } from "./utils/comparison"
import InfoModal from "./components/InfoModal"

const App = () => {
  ReactModal.setAppElement("#root")
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [won, setWon] = useState<{ state: boolean, modal: boolean }>({ state: false, modal: false })
  const [lost, setLost] = useState<{ state: boolean, modal: boolean, card: Card }>({ state: false, modal: false, card: {} as Card })
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
          axios.get("http://localhost:3000/lost").then(({ data }) => {
            console.log(data);
            setLost({ state: true, modal: true, card: data })
          })
        }
      }
    }
  }, [guesses])

  return (
    <>
      <InfoModal open={showInfo} setOpen={setShowInfo} />
      <GuessBar>
        <Bar $width={(guesses.length/20) * 100} $won={won.state} />
        <Amount>{guesses.length}/20</Amount>
      </GuessBar>
      <GuessForm won={won.state} lost={lost.state} />
      <Guesses colorblind={false} />

      <Modal isOpen={won.modal} onRequestClose={() => setWon(prev => ({ ...prev, modal: false }))} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
        <h2>You win!</h2>
        <p>You guessed <strong>{guesses[guesses.length - 1]?.guess.name}</strong> in {guesses.length} tr{guesses.length === 0 || guesses.length > 1 ? "ies" : "y"}.</p>
        <Guess guess={guesses[guesses.length - 1]?.guess} comparison={guesses[guesses.length - 1]?.comparison} colorblind={false} />
      </Modal>

      <Modal isOpen={lost.modal} onRequestClose={() => setLost(prev => ({ ...prev, modal: false }))} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
        <h2>Too bad!</h2>
        <p>The card was <strong>{lost.card.name}</strong>.</p>
        <Guess guess={lost.card} comparison={{}} colorblind={false} />
      </Modal>
      <Version aria-hidden="true">Version 1.0.0</Version>
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

const Modal = styled(ReactModal)`
  outline: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  & > h2 {
    color: #ddd;
    font-size: 3rem;
    margin: 0;
  }

  & > p {
    color: #ddd;
    font-size: 1.5rem;
    margin: 20px;
  }
`

const Version = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #aaa;
  font-size: 0.8rem;
  z-index: 2;
  pointer-events: none;
  opacity: 0.5;
`

export default App
