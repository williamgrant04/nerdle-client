import styled from 'styled-components';

interface AutocompleteProps {
  autocomplete: { selected: boolean, values: string[] },
  setAutocomplete: React.Dispatch<React.SetStateAction<{ selected: boolean, values: string[] }>>,
  setGuess: React.Dispatch<React.SetStateAction<string>>
}

// TODO: Make an "onClickOutside" hook to hide autocomplete when clicking away from it
// And find a way to reopen it with the same values if the user clicks on the input again
// TODO: Make the wrapper shrink if there aren't enough values to fill the height
const Autocomplete = ({ autocomplete, setAutocomplete, setGuess }: AutocompleteProps) => {
  const clickHandler = (name: string) => {
    setGuess(name);
    setAutocomplete({ selected: true, values: [] });
  }

  return (
    <AutocompleteWrapper>
      {
        autocomplete.values &&
        autocomplete.values.map((cardName) => {
          return (
            <span key={cardName} onClick={() => clickHandler(cardName)}>{cardName}</span>
          )
        })
      }
    </AutocompleteWrapper>
  )
}

const AutocompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #333;
  width: 100%;
  height: 350px;
  overflow-y: auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 0 0 8px 8px;
  font-size: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  & > span {
    padding: 10px 20px;
    cursor: pointer;
    color: #ddd;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }
  }
`

export default Autocomplete;
