import { Route, Routes, Navigate } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

// layouts
import PlainLayout from './layouts/PlainLayout'
import AdminLayout from './layouts/admin'

// pages
import Login from './pages/auth/Login'
import Page404 from './pages/Page404'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='' element={<Navigate to='users' />} />
          {/*
            <Route path='users' element={<UsersList />} />
            <Route path='projects' element={<ProjectsList />} />
            <Route path="products">
              <Route path="" element={<Navigate to="panels" />} />
              <Route path="panels" element={<PanelsList />} />
              <Route path="inverters" element={<InvertersList />} />
              <Route path="batteries" element={<BatteriesList />} />
            </Route>
  */}
        </Route>
        <Route path="/" element={<PlainLayout />}>
          <Route path='' element={<Navigate to='admin' />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  )
}

export default App
