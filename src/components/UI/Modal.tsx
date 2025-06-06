import ReactModal from "react-modal"
import styled from "styled-components"

interface ModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactNode
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  ReactModal.setAppElement("#root");

  return (
    <Wrapper isOpen={open} onRequestClose={() => setOpen(false)} style={{ overlay: { backgroundColor: '#000000aa', zIndex: 3 } }}>
      <Close onClick={() => setOpen(false)} aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </Close>
      { children }
    </Wrapper>
  )
}

const Wrapper = styled(ReactModal)`
  outline: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  border-radius: 8px;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  color: #ddd;

  & > h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
  }

  & > p {
    color: #ddd;
    font-size: 1.5rem;
    margin: 10px 0;
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;

    & > h1 {
      font-size: 2rem;
    }

    & > p {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 425px) {
    & > h1 {
      font-size: 1.5rem;
    }

    & > p {
      font-size: 1rem;
    }
  }
`

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 4px solid #555;
  background-color: transparent;
  transition: 0.3s;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #555;
  }
`

export default Modal;
