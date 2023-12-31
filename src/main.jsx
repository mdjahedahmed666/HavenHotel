import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routes/routes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParallaxProvider>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    </ParallaxProvider>
  </React.StrictMode>,
)
