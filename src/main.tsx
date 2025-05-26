import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GuessContextProvider } from './context/GuessContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuessContextProvider>
      <App />
    </GuessContextProvider>
  </StrictMode>,
)
