import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { SocketContextProvider } from './context/socketContext.jsx'
import { AuthContext, AuthContextProvider } from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContextProvider>
  <SocketContextProvider>
    <App />
    </SocketContextProvider>
  </AuthContextProvider>

  </BrowserRouter>
)
