import { useContext } from "react";
import Guess from "./Guess";
import Modal from "./UI/Modal";
import guessContext from "../context/GuessContext";
import { comparison } from "../utils/comparison";
import styled from "styled-components";
import settingsContext from "../context/SettingsContext";

interface WinLossProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  lossCard: Card | null
}

// lossCard
const WinLossModal = ({ open, setOpen, lossCard }: WinLossProps) => {
  const { guesses, endlessGuesses, setEndlessGuesses } = useContext(guessContext);
  const { colorblind, endless } = useContext(settingsContext);

  return (
    <Modal open={open} setOpen={setOpen} onAfterClose={() => {
      if (endless) {
        setEndlessGuesses([]);
      }
    }}>
      <h2>{lossCard ? "Too bad!" : "You win!"}</h2>
      { lossCard ? (
        <>
          <p>The card was <strong>{lossCard.name}</strong>.</p>
          <Guess guess={lossCard} comparison={{}} colorblind={colorblind} />
        </>
      ) : (
        endless ? (
          <>
            <p>You guessed <strong>{endlessGuesses[endlessGuesses.length - 1]?.guess.name}</strong> in {endlessGuesses.length} tr{endlessGuesses.length === 0 || endlessGuesses.length > 1 ? "ies" : "y"}.</p>
            <Guess guess={endlessGuesses[endlessGuesses.length - 1]?.guess} comparison={endlessGuesses[endlessGuesses.length - 1]?.comparison} colorblind={colorblind} />
          </>
        ) : (
          <>
            <p>You guessed <strong>{guesses[guesses.length - 1]?.guess.name}</strong> in {guesses.length} tr{guesses.length === 0 || guesses.length > 1 ? "ies" : "y"}.</p>
            <Guess guess={guesses[guesses.length - 1]?.guess} comparison={guesses[guesses.length - 1]?.comparison} colorblind={colorblind} />
          </>
        )
      )}
      { !endless && <ShareButton onClick={() => comparison.share()}>Share</ShareButton> }
    </Modal>
  )
}

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

export default WinLossModal;
