interface AutocompleteProps {
  autocomplete: { selected: boolean, values: string[] },
  setAutocomplete: React.Dispatch<React.SetStateAction<{ selected: boolean, values: string[] }>>,
  setGuess: React.Dispatch<React.SetStateAction<string>>
}

const Autocomplete = ({ autocomplete, setAutocomplete, setGuess }: AutocompleteProps) => {
  const clickHandler = (name: string) => {
    setGuess(name);
    setAutocomplete({ selected: true, values: [] });
  }

  return (
    <div>
      {
        autocomplete.values &&
        autocomplete.values.map((cardName) => {
          return (
            <div key={cardName} onClick={() => clickHandler(cardName)}>{cardName}</div>
          )
        })
      }
    </div>
  )
}

export default Autocomplete;
