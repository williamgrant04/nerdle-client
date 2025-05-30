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
      <GuessImage src={guess.image_uris?.png} height="250" alt={guess.name} />

      <Segment $near={comparison.mana.diff} $correct={comparison.mana.hls === "same"}>
        <p>Mana</p>
        <div>
          <p>{guess.cmc}</p>
          <Arrow direction={comparison.mana.hls}/>
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
          <p>{new Date(guess.released_at).getFullYear()}</p>
          <Arrow direction={comparison.released_at} />
        </Set>
      </Segment>

      <Segment $correct={comparison.colors.all} data-colors>
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
          !comparison.colors.all &&
          <ColorBar $percentage={correctPercentage(guess.colors, comparison.colors.matching)}>
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

  p {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
  }
`

const GuessImage = styled.img`
  grid-row: span 2;
  align-self: center;
`

const Segment = styled.div<{ $near?: boolean, $correct?: boolean, $type?: boolean }>`
  grid-column: ${({ $type }) => ($type ? "span 2" : "span 1")};
  background-color: ${({ $near, $correct }) => ($correct ? "#538d4e" : $near ? "#b59f3b" : "#ddd")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;

  &:not(&[data-colors]) {
    div {
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;

      p {
        margin: 0;
        font-size: 1.25rem;
        font-weight: normal;
      }
    }
  }
`

const Set = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;

  img {
    width: 50px;
    height: 50px;
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
`

export default Guess;
