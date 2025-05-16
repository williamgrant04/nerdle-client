interface AutocompleteProps {
  autocomplete: string[],
  setAutocomplete: React.Dispatch<React.SetStateAction<string[]>>,
  setGuess: React.Dispatch<React.SetStateAction<string>>
}

const Autocomplete = ({ autocomplete, setAutocomplete, setGuess }: AutocompleteProps) => {
  return (
    <div>
      {
        autocomplete &&
        autocomplete.map((item) => {
          return (
            <span key={item}>{item}</span>
          )
        })
      }
    </div>
  )
}

export default Autocomplete;
