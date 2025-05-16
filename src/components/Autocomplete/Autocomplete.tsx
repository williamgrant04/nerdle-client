interface AutocompleteProps {
  autocomplete: string[],
  setAutocomplete: React.Dispatch<React.SetStateAction<string[]>>,
  setGuess: React.Dispatch<React.SetStateAction<string>>
}

const Autocomplete = ({ autocomplete, setAutocomplete, setGuess }: AutocompleteProps) => {
  const clickHandler = (name: string) => {
    setGuess(name);
    setAutocomplete([]);
  }

  return (
    <div>
      {
        autocomplete &&
        autocomplete.map((cardName) => {
          return (
            <div key={cardName} onClick={() => clickHandler(cardName)}>{cardName}</div>
          )
        })
      }
    </div>
  )
}

export default Autocomplete;
