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
import SettingsModal from "./components/SettingsModal"
import settingsContext from "./context/SettingsContext"
import { scryfall } from "./utils/scryfall"

const App = () => {
  const [won, setWon] = useState<{ state: boolean, modal: boolean }>({ state: false, modal: false })
  const [lost, setLost] = useState<{ state: boolean, modal: boolean, card: Card | null }>({ state: false, modal: false, card: null })
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const { guesses, setGuesses, endlessGuesses, endlessCard, setEndlessCard } = useContext(guessContext)
  const { setShowModal, endless } = useContext(settingsContext)

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

  useEffect(() => {
    setLost(prev => ({ ...prev, card: null }));
    const lastGuess = endlessGuesses[endlessGuesses.length - 1];
    if (lastGuess) {
        if (comparison.checkComparison(lastGuess.comparison)) {
        setWon({ state: true, modal: true });
        scryfall.getRandomCard().then((card) => {
          if (!card) return;
          setEndlessCard(card);
        })
      } else {
        setWon({ state: false, modal: false });
        if (endlessGuesses.length >= 20) {
          setLost({ state: true, modal: true, card: endlessCard })
          scryfall.getRandomCard().then((card) => {
            if (!card) return;
            setEndlessCard(card);
          })
        }
      }
    }
  }, [endlessGuesses])

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
      <Guesses />

      <WinLossModal open={ won.modal || lost.modal } setOpen={handleWinLossModal} lossCard={lost.card} />

      <InfoModal open={showInfo} setOpen={setShowInfo} />
      <SettingsModal />

      <Actions>
        <ActionButton onClick={() => setShowInfo(true)}>
          <span>i</span>
        </ActionButton>

        <ActionButton onClick={() => setShowModal(true)}>
          <svg fill="#ddd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.97 45.97">
            <path d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z"></path>
          </svg>
        </ActionButton>
      </Actions>

      { endless && <EndlessNotifier>Endless mode</EndlessNotifier>}
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

const Actions = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
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

  & > svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: #777;
  }
`

const EndlessNotifier = styled.span`
  position: fixed;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
  color: #ddd;
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
