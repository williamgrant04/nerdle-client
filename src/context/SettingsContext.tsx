import { createContext, useState } from "react";

const settingsContext = createContext({
  colorblind: false,
  setColorblind: ((_value: boolean) => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  endless: false,
  setEndless: ((_value: boolean) => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  showModal: false,
  setShowModal: ((_value: boolean) => {}) as React.Dispatch<React.SetStateAction<boolean>>,
})

export const SettingsContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [colorblind, setColorblind] = useState<boolean>(localStorage.getItem("colorblind") === "true");
  const [endless, setEndless] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <settingsContext.Provider value={{
      colorblind,
      setColorblind,
      endless,
      setEndless,
      showModal,
      setShowModal
    }}>
      { children }
    </settingsContext.Provider>
  )
}

export default settingsContext
