import classes from './Autocomplete.module.css';

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
    <div className={classes.autocomplete}>
      {
        autocomplete.values &&
        autocomplete.values.map((cardName) => {
          return (
            <span key={cardName} onClick={() => clickHandler(cardName)}>{cardName}</span>
          )
        })
      }
    </div>
  )
}

export default Autocomplete;
