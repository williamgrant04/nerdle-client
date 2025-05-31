import ReactModal from "react-modal";
import styled from "styled-components";

const InfoModal = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  ReactModal.setAppElement("#root");
  return (
    <Modal isOpen={open} onRequestClose={() => setOpen(false)} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
      <h1>How to play</h1>
      <p>Start by typing the name of a card and selecting it from the autocomplete list.</p>
      <p>After making a guess if an attribute on the card was correct, the box will be <Color $correct>green</Color></p>
      <p>There are some special cases though:</p>
      <Cases>
        <Case>
          <h2>Mana</h2>
          <p>If the mana cost of the card you guessed is within 2 of the target card's mana cost, the box will be <Color $near>yellow</Color></p>
          <p>Otherwise, the box will be grey.</p>
          <p>An arrow will display whether the target card is higher or lower than your guess</p>
        </Case>
        <Case>
          <h2>Colors</h2>
          <p>If all colors match, the box will be <Color $correct>green</Color></p>
          <p>If some colors match, a bar will show the percentage of correct colors, if 2/3 colors are correct the bar will be <Color $near>filled</Color> by 66%</p>
          <p>If all colors match but the target card has more colors on it, the bar will be <Color $correct>filled</Color> but the box won't be.</p>
        </Case>
      </Cases>
    </Modal>
  )
}

const Color = styled.span<{ $near?: boolean, $correct?: boolean }>`
  background-color: ${({ $near, $correct }) => ($correct ? "#538d4e" : $near ? "#b59f3b" : "transparent")};
  color: #000;
  padding: 2px 6px;
  border-radius: 8px;
`

const Cases = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Case = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: #444;
  border-radius: 8px;
  & > h2 {
    align-self: center;
    margin: 0 0 8px 0;
    font-size: 1.5rem;
  }

  & > p {
    margin: 8px 0;
    font-size: 1.2rem;
  }
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

  color: #ddd;
  & > h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
  }

  & > p {
    color: #ddd;
    font-size: 1.5rem;
    margin: 10px 0;
  }
`

export default InfoModal;
