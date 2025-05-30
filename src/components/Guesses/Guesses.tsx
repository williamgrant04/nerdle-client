import { useContext, useEffect } from "react";
import guessContext from "../../context/GuessContext";
import Arrow from "../Arrow/Arrow";
import classes from "./Guesses.module.css";
import colors from "./Colors.module.css"
import { comparison } from "../../utils/comparison";

/*
  This component is disgusting, I need to refactor it (later)
*/
const Guesses = ({ colorblind, setWon }: { colorblind: boolean, setWon: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { guesses, setGuesses } = useContext(guessContext);

  const mapColor = (color: string) => {
    switch (color) {
      case "W":
        return colors.white;
      case "U":
        return colors.blue;
      case "B":
        return colors.black;
      case "R":
        return colors.red;
      case "G":
        return colors.green;
      default:
        return  colors.white;
    }
  }

  useEffect(() => {
    const storedGuesses = JSON.parse(localStorage.getItem("guesses")!);
    if (storedGuesses && storedGuesses.length > 0) {
      setGuesses(storedGuesses);
    }
  }, []);

  useEffect(() => {
    const lastGuess = guesses[guesses.length - 1];
    if (lastGuess) {
      if (comparison.checkComparison(lastGuess.comparison))
        setWon(true);
      else
        setWon(false);
    }
  }, [guesses])

  return (
    <div className="center-children" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {
        guesses.map(({ guess, comparison }) => (
          <div key={guess.id} className={ classes.guessWrapper }>
            <h2>{guess.name}</h2>
            <div className={ classes.guess }>
              <img src={guess.image_uris?.png} height="200" alt={guess.name} className={ classes.guessImage }/>

              <div className={ classes.mana }>
                <p>Mana</p>
                <div>
                  <p>{guess.cmc}</p>
                  <Arrow direction={comparison.mana}/>
                </div>
              </div>

              <div className={ classes.rarity }>
                <p>Rarity</p>
                <div>
                  <p>{guess.rarity}</p>
                  <Arrow direction={comparison.rarity} />
                </div>
              </div>

              <div className={ classes.set }>
                <p>Set</p>
                <div>
                  <img src={guess.set_image}/>
                  <p>{new Date(guess.released_at).getFullYear()}</p>
                  <Arrow direction={comparison.released_at} />
                </div>
              </div>

              <div className={ classes.colorsWrapper }>
                <p>Colors</p>
                <div className={ `${classes.colors} ${colorblind && colors.colorblind}` }>
                  {
                    guess.colors.map((color, index) => (
                      <span key={index} className={ `${mapColor(color)} ${colors.color}` }>
                        {color}
                      </span>
                    ))
                  }
                </div>
                {/* <p>{`${comparison.colors.remaining}`}</p>
                <p>comp: {comparison.colors.matching.join(", ")}</p> */}
              </div>

              <div className={ classes.type }>
                <p>Type</p>
                <div>
                  <p>{guess.type_line.split("—")[0]?.trim() ?? "—"}</p>
                </div>
              </div>

              <div className={ classes.subtype }>
                <p>Subtype</p>
                <div>
                  <p>{guess.type_line.split("—")[1]?.trim() ?? "—"}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Guesses;
