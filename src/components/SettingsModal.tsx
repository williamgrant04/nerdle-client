import { useContext } from "react";
import Modal from "./UI/Modal";
import settingsContext from "../context/SettingsContext";
import ToggleSwitch from "./UI/ToggleSwitch";
import styled from "styled-components";

const SettingsModal = () => {
  const settings = useContext(settingsContext);

  return (
    <Modal open={settings.showModal} setOpen={settings.setShowModal}>
      <h1>Settings</h1>
      <Setting>
        <div>
          <h2>Colorblind</h2>
          <ToggleSwitch
            toggled={settings.colorblind}
            onToggle={() => settings.setColorblind(prev => {
              localStorage.setItem("colorblind", (!prev).toString());
              return !prev;
            })}
          />
        </div>
        <p>
          Colorblind mode will add a color symbol to the card colors to help distinguish them.
        </p>
      </Setting>

      <Setting>
        <div>
          <h2>Endless</h2>
          <ToggleSwitch
            toggled={settings.endless}
            onToggle={() => settings.setEndless(prev => !prev)}
          />
        </div>
        <p>
          Endless mode will allow you to keep going for as long as you'd like. A new card to compare against will be chosen every time you win or lose in endless.
        </p>
      </Setting>
    </Modal>
  )
}

const Setting = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0 0 0;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;

    & > h2 {
      margin: 0;
    }

    & > input {
      height: 20px;
    }
  }
`

export default SettingsModal;
