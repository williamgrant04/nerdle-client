import { useContext } from "react";
import guessContext from "../../context/GuessContext";
import Arrow from "../Arrow/Arrow";
import classes from "./Guesses.module.css";

const Guesses = () => {
  const { guesses } = useContext(guessContext);

  return (
    <div className="center-children">
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

              <div className={ classes.type }>
                <p>Type</p>
                <div>
                  <p>{guess.type_line.split(" ")[0]}</p>
                </div>
              </div>

              <div className={ classes.subtype }>
                <p>Subtype</p>
                <div>
                  <p>{guess.type_line.split(" ")[2]}</p>
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

              <div className={ classes.colors }>
                <p>Colors</p>
                <p>{guess.colors.join(", ")}</p>
                <p>{`${comparison.colors.remaining}`}</p>
                <p>comp: {comparison.colors.matching.join(", ")}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Guesses;
