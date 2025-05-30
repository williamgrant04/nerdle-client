import styled from 'styled-components';

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
  background-color: #ccc;
  width: 100%;
  padding: 10px 0;
  z-index: 1;
  border-radius: 0 0 8px 8px;
  font-size: 1.25rem;

  & > span {
    padding: 10px 20px;
    cursor: pointer;
    color: #333;
    transition: 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`

export default Autocomplete;
