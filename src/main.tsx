import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add theme class to html element based on local storage or system preference
const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('ftf-finance-theme')
  if (storedTheme) return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

document.documentElement.classList.add(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
