import styled from "styled-components";
import Modal from "./UI/Modal";

const InfoModal = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <h1>How to play</h1>
      <p>The bar at the top of your screen represents the amount of guesses you have left.</p>
      <p>Start by typing the name of a card and selecting it from the autocomplete list.</p>
      <p>After making a guess if an attribute on the card was correct, the box will be <Color $correct>green</Color>.</p>
      <p>There are some special cases though:</p>
      <Cases>
        <Case>
          <h2>Mana</h2>
          <p>If the mana cost of the card you guessed is within 2 of the target card's mana cost, the box will be <Color $near>yellow</Color>.</p>
          <p>Otherwise, the box will be grey.</p>
          <p>An arrow will display whether the target card is higher or lower than your guess.</p>
        </Case>
        <Case>
          <h2>Colors</h2>
          <p>If all colors match, the box will be <Color $correct>green</Color>.</p>
          <p>If some colors match, a bar will show the percentage of correct colors, if 2/3 colors are correct the bar will be <Color $near>filled</Color> by 66%.</p>
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

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
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

  @media screen and (max-width: 768px) {
    margin: 10px;
    padding: 15px;

    & > h2 {
      margin: 0 0 8px 0;
      font-size: 1.25rem;
    }

    & > p {
      margin: 8px 0;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 425px) {
    margin: 5px;
    padding: 10px;

    & > h2 {
      font-size: 1rem;
    }

    & > p {
      font-size: 0.9rem;
    }
  }
`

export default InfoModal;
