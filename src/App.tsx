import Guesses from "./components/Guesses/Guesses"
import GuessForm from "./components/GuessForm/GuessForm"

const App = () => {
  return (
    <>
      <GuessForm />
      <Guesses colorblind={false}/>
    </>
  )
}

export default App
