import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
import { GoogleOAuthProvider } from "@react-oauth/google" // 👈 1. Import

// 👈 2. Replace with your actual Client ID from Google Cloud Console:
const GOOGLE_CLIENT_ID = "595012710343-247rcsts8nkf2g94rsrl9gaco913g8h8.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <App />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)