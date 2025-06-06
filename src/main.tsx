import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GuessContextProvider } from './context/GuessContext.tsx'
import { SettingsContextProvider } from './context/SettingsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsContextProvider>
      <GuessContextProvider>
        <App />
      </GuessContextProvider>
    </SettingsContextProvider>
  </StrictMode>,
)
