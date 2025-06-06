import styled from "styled-components"
import Arrow from "./Arrow"

const Guess = ({ guess, comparison, colorblind }: { guess: Card, comparison: Comparison, colorblind: boolean }) => {

  const correctPercentage = (gColors: string[], cColors: string[]) => {
    const larger = gColors.length > cColors.length ? gColors : cColors;
    const smaller = gColors.length > cColors.length ? cColors : gColors;
    return (smaller.length / larger.length) * 100;
  }

  return (
    <GuessWrapper>
      <GuessImage src={guess.image_uris ? guess.image_uris?.png : guess.card_image} height="250" alt={guess.name} />

      <Segment $near={comparison.mana?.diff} $correct={comparison.mana?.hls === "same"}>
        <p>Mana</p>
        <div>
          <p>{guess.cmc}</p>
          <Arrow direction={comparison.mana?.hls}/>
        </div>
      </Segment>

      <Segment $correct={comparison.rarity === "same"}>
        <p>Rarity</p>
        <div>
          <p>{guess.rarity}</p>
          <Arrow direction={comparison.rarity} />
        </div>
      </Segment>

      <Segment $near={comparison.released_at === "same" && !comparison.set} $correct={comparison.set && comparison.released_at === "same"}>
        <p>Set</p>
        <Set>
          <img src={guess.set_image}/>
          <div>
            <p>{new Date(guess.released_at).getFullYear()}</p>
            <Arrow direction={comparison.released_at} />
          </div>
        </Set>
      </Segment>

      <Segment $correct={comparison.colors?.all} data-colors>
        <p>Colors</p>
        <Colors $colorblind={colorblind}>
          {
            guess.colors.map((color, index) => (
              <Color $color={color} key={index}>
                {color}
              </Color>
            ))
          }
        </Colors>
        {
          comparison.colors && !comparison.colors?.all &&
          <ColorBar $percentage={correctPercentage(guess.colors, comparison.colors?.matching)}>
            <div></div>
          </ColorBar>
        }
      </Segment>

      <Segment $correct={comparison.type} $type>
        <p>Type</p>
        <div>
          <p>{guess.type_line.split("—")[0]?.trim() ?? "—"}</p>
        </div>
      </Segment>

      <Segment $correct={comparison.subtype} $type>
        <p>Subtype</p>
        <div>
          <p>{guess.type_line.split("—")[1]?.trim() ?? "—"}</p>
        </div>
      </Segment>
    </GuessWrapper>
  )
}

const GuessWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  justify-items: stretch;
  align-items: stretch;
  gap: 10px;
  position: relative;

  p {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;

    @media screen and (max-width: 375px) {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1.5fr 0.8fr 0.8fr;
    gap: 6px;
  }
`

const GuessImage = styled.img`
  grid-row: span 2;
  z-index: -1;
  align-self: center;

  @media screen and (max-width: 768px) {
    grid-row: span 4;
    justify-self: end;
  }

  @media screen and (max-width: 550px) {
    grid-row: span 2;
    grid-column: span 3;
    justify-self: center;
  }

  @media screen and (max-width: 320px) {
    grid-row: span 1;
    width: 125px;
    height: auto;
    align-self: end;
  }
`

const Segment = styled.div<{ $near?: boolean, $correct?: boolean, $type?: boolean }>`
  grid-column: ${({ $type }) => ($type ? "span 2" : "span 1")};
  background-color: ${({ $near, $correct }) => ($correct ? "#538d4e" : $near ? "#b59f3b" : "#ddd")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  z-index: -2;
  color: #333;

  @media screen and (max-width: 768px) {
    grid-column: span 1;
  }

  &:not(&[data-colors]) {
    div {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 320px) {
        gap: 0;
      }

      p {
        margin: 0;
        font-size: 1.25rem;
        font-weight: normal;

        @media screen and (max-width: 375px) {
          font-size: 1rem;
        }
      }
    }
  }
`

const Set = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 420px) {
    flex-direction: column;

    img {
      width: 40px;
      height: 40px;
    }
  }
`

const Colors = styled.div<{ $colorblind: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  column-gap: 10px;
  justify-items: center;
  align-items: center;
  color: ${({ $colorblind }) => ($colorblind ? "#000" : "transparent")};

  & > :nth-child(3) {
    position: absolute;
  }

  & > :only-child {
    grid-column: span 2;
  }

  @media screen and (max-width: 768px) and (min-width: 550px) {
    display: flex;
    justify-content: center;

    & > :nth-child(3) {
      position: relative;
    }
  }

  @media screen and (max-width: 550px) {
    column-gap: 15px;
  }
`

const ColorBar = styled.div<{ $percentage: number }>`
  margin-top: 10px;
  height: 8px;
  border-radius: 8px;
  width: 70%;
  background-color: #bbb;
  align-self: center;
  justify-content: flex-start !important;

  & > div {
    border-radius: 8px;
    height: 100%;
    width: ${({ $percentage }) => `${$percentage}%`};
    background-color: ${({ $percentage }) => ($percentage === 100 ? "#538d4e" : "#b59f3b")};
  }
`

const mapColor = (color: string) => {
  switch (color) {
    case "W":
      return "#fffbd5";
    case "U":
      return "#aae0fa";
    case "B":
      return "#cbc2bf";
    case "R":
      return "#f9aa8f";
    case "G":
      return "#9bd3ae";
    default:
      return "#fffbd5";
  }
}

const Color = styled.span<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 2px;
  border-radius: 50%;
  background-color: ${({ $color }) => mapColor($color)};

  @media screen and (max-width: 320px) {
    width: 20px;
    height: 20px;
  }
`

export default Guess;
