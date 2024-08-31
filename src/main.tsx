import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Map from "./Map.tsx"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
      <Map size={50} minDistance={40} maxDistance={45}/>
  </StrictMode>,
)
