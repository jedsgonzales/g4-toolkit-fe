import { Route, Routes, Navigate } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

// theme
import ThemeConfig from './theme'

// layouts
import PlainLayout from './layouts/PlainLayout'
import AdminLayout from './layouts/admin'
import UserLayout from './layouts/user'

// pages
import Login from './pages/auth/Login'
import Page404 from './pages/Page404'

// admin pages
import UsersList from './pages/admin/UsersList'
//import RolesList from './pages/admin/RolesList'
import LocationsList from './pages/admin/LocationsList'
import DevicesList from './pages/admin/DevicesList'
// user pages
import LocationsListU from './pages/user/LocationsList'
import DevicesListU from './pages/user/DevicesList'
import SystemFilterList from './pages/admin/SystemFilters'


const App = () => {
  return (
    <ThemeConfig>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' element={<Navigate to='system-filters' />} />
            <Route path='system-filters' element={<SystemFilterList />} />
            <Route path='users' element={<UsersList />} />
            <Route path='devices' element={<DevicesList />} />
            <Route path='locations' element={<LocationsList />} />
            {/*
            <Route path='projects' element={<ProjectsList />} />
            <Route path="products">
              <Route path="" element={<Navigate to="panels" />} />
              <Route path="panels" element={<PanelsList />} />
              <Route path="inverters" element={<InvertersList />} />
              <Route path="batteries" element={<BatteriesList />} />
            </Route>
  */}
          </Route>
          <Route path='/user' element={<UserLayout />}>
            <Route path='' element={<Navigate to='devices' />} />
            <Route path='devices' element={<DevicesListU />} />
            <Route path='locations' element={<LocationsListU />} />
          </Route>
          <Route path="/" element={<PlainLayout />}>
            <Route path='' element={<Navigate to='admin' />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeConfig>
  )
}

export default App
