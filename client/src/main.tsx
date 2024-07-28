import React from 'react'
import ReactDOM from 'react-dom/client'
import MatrixApp from './MatrixApp.tsx'
import './index.css'
import 'chart.js/auto';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MatrixApp />
  </React.StrictMode>,
)
