import { Route, Routes, Navigate } from 'react-router-dom'
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

// layouts
import PlainLayout from './layouts/PlainLayout'

// pages
import Login from './pages/auth/Login'
import Page404 from './pages/Page404'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<PlainLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App
