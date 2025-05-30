import { useEffect, useState } from "react"
import Guesses from "./components/Guesses/Guesses"
import GuessForm from "./components/GuessForm/GuessForm"

const App = () => {
  const [won, setWon] = useState<boolean>(false)

  useEffect(() => {
    if (won) {
      console.log("Win flag")
    } else {
      console.log("not won")
    }
  }, [won])

  return (
    <>
      <GuessForm won={won} />
      <Guesses colorblind={false} setWon={setWon} />
    </>
  )
}

export default App
