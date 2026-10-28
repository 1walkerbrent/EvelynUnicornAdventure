import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { migrateLegacySave } from './state/save'

// Before the first render, so the slot picker already sees a pre-slot save in slot 1.
migrateLegacySave()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
