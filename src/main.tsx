import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Map from "./Map.tsx"
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <input id="minDistance" type="number" min="17" value="17" onChange={function(){localStorage.setItem("minMax", this.value)}}></input>
      <input type="number" min={localStorage.getItem("minMax")}></input>
      <Map minDistance={17} maxDistance={30}/>
  </StrictMode>,
)
