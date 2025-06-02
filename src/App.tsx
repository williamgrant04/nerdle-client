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
import SetList from "./components/SetList"

const App = () => {
  ReactModal.setAppElement("#root")
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [won, setWon] = useState<{ state: boolean, modal: boolean }>({ state: false, modal: false })
  const [lost, setLost] = useState<{ state: boolean, modal: boolean, card: Card }>({ state: false, modal: false, card: {} as Card })
  const { guesses, setGuesses } = useContext(guessContext)

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
        if (guesses.length >= 20) {
          axios.get(`${import.meta.env.VITE_API_URL}/lost`).then(({ data }) => {
            setLost({ state: true, modal: true, card: data })
          })
        }
      }
    }
  }, [guesses])

  return (
    <>
      <InfoButton onClick={() => setShowInfo(true)}>
        <span>i</span>
      </InfoButton>
      <InfoModal open={showInfo} setOpen={setShowInfo} />
      <GuessBar>
        <Bar $width={(guesses.length/20) * 100} $won={won.state} />
        <Amount>{guesses.length}/20</Amount>
      </GuessBar>
      <SetList />
      <GuessForm won={won.state} lost={lost.state} />
      <Guesses colorblind={false} />

      <Modal isOpen={won.modal} onRequestClose={() => setWon(prev => ({ ...prev, modal: false }))} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
        <Close onClick={() => setWon(prev => ({ ...prev, modal: false }))} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Close>
        <h2>You win!</h2>
        <p>You guessed <strong>{guesses[guesses.length - 1]?.guess.name}</strong> in {guesses.length} tr{guesses.length === 0 || guesses.length > 1 ? "ies" : "y"}.</p>
        <Guess guess={guesses[guesses.length - 1]?.guess} comparison={guesses[guesses.length - 1]?.comparison} colorblind={false} />
        <ShareButton onClick={() => comparison.share()}>Share</ShareButton>
      </Modal>

      <Modal isOpen={lost.modal} onRequestClose={() => setLost(prev => ({ ...prev, modal: false }))} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
        <Close onClick={() => setLost(prev => ({ ...prev, modal: false }))} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Close>
        <h2>Too bad!</h2>
        <p>The card was <strong>{lost.card.name}</strong>.</p>
        <Guess guess={lost.card} comparison={{}} colorblind={false} />
        <ShareButton onClick={() => comparison.share()}>Share</ShareButton>
      </Modal>
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

const Modal = styled(ReactModal)`
  outline: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
  position: absolute;
  max-height: 90vh;
  overflow-y: auto;
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
    text-align: center;
    color: #ddd;
    font-size: 1.5rem;
    margin: 20px;
  }
`

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 4px solid #555;
  background-color: transparent;
  transition: 0.3s;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #555;
  }
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

const ShareButton = styled.button`
  background-color: #555;
  outline: 0;
  color: #ddd;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.2rem;
  margin-top: 20px;
  &:hover {
    background-color: #777;
  }

`

export default App
