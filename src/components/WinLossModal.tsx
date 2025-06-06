import { useContext } from "react";
import Guess from "./Guess";
import Modal from "./UI/Modal";
import guessContext from "../context/GuessContext";
import { comparison } from "../utils/comparison";
import styled from "styled-components";

interface WinLossProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  lossCard?: Card
}

// lossCard
const WinLossModal = ({ open, setOpen, lossCard }: WinLossProps) => {
  const { guesses } = useContext(guessContext);

  return (
    <Modal open={open} setOpen={setOpen}>
      <h2>{lossCard ? "Too bad!" : "You win!"}</h2>
      { lossCard ? (
        <>
          <p>The card was <strong>{lossCard.name}</strong>.</p>
          <Guess guess={lossCard} comparison={{}} colorblind={false} />
        </>
      ) : (
        <>
          <p>You guessed <strong>{guesses[guesses.length - 1]?.guess.name}</strong> in {guesses.length} tr{guesses.length === 0 || guesses.length > 1 ? "ies" : "y"}.</p>
          <Guess guess={guesses[guesses.length - 1]?.guess} comparison={guesses[guesses.length - 1]?.comparison} colorblind={false} />
        </>
      )}
      <ShareButton onClick={() => comparison.share()}>Share</ShareButton>
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
