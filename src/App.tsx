import { Route, Routes, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
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
import SystemFilterList from './pages/admin/SystemFilters'

const router = createBrowserRouter([
  { path: "/", element: <PlainLayout /> },
  { path: "", element: <Navigate to='admin' /> },
  { path: "/login", element: <Login /> },
  { path: "/admin/*", element: <AdminLayout />, children: [
    { index: true, element: <SystemFilterList /> },
    { path: '*', element: <SystemFilterList /> },

    { path: 'system-filters', element: <SystemFilterList /> },
    { path: 'users', element: <UsersList /> },
    { path: 'devices', element: <DevicesList /> },
    { path: 'locations', element: <LocationsList /> },
    { path: 'locations/:property', element: <LocationsList /> },
    { path: 'locations/:property/:level', element: <LocationsList /> },
    { path: 'locations/:property/:unit', element: <LocationsList /> },
  ] },
  { path: "/user", element: <UserLayout /> },
  { path: "*", element: <Page404 /> },
]);

const App = () => {
  return (
    <ThemeConfig>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeConfig>
  )
}

export default App
