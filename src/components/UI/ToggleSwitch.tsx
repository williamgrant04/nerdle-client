import styled from "styled-components";

interface ToggleSwitchProps {
  onToggle?: (state: boolean) => void,
  toggled?: boolean,
  [key: string]: any
}

const ToggleSwitch = ({ onToggle, toggled, ...props }: ToggleSwitchProps) => {
  if (props.children) throw new Error("ToggleSwitch component cannot have child elements.")

  return (
    <Switch type="checkbox" onChange={(e) => {onToggle && onToggle(e.target.checked)}} checked={toggled} {...props}/>
  )
}

const Switch = styled.input`
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  aspect-ratio: 5/3;
  min-width: 25px;
  width: inherit;
  height: inherit;
  border-radius: 25px;
  background-color: #888;
  transition: 0.3s;
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    height: 65%;
    aspect-ratio: 1/1;
    border-radius: 25px;
    background-color: #fff;
  }

  &:checked {
    background-color: #1da830;

    &::after {
      left: 70%;
    }
  }

  &:active::after {
    height: 65%;
    aspect-ratio: 1/1;
    left: 50%;
    border-radius: 25px;
  }
`

export default ToggleSwitch;
