import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/global.css' // <--- TEM QUE TER ISSO AQUI!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)