import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
//import { HashLink as Link } from 'react-router-hash-link'
// material
import { styled, alpha } from '@mui/material/styles'
import {
    Backdrop,
    CircularProgress,
    Typography,
    Stack,
    Fab,
    Box,
} from '@mui/material'
// icons
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
// components
// layout components
import menus from 'src/assets/menusAdmin.json'
import Topbar from './Topbar'
//import Sidebar from './Sidebar'
//import Footer from '@/components/Footer'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { authValidate } from 'src/redux/authSlice'
// hooks
//import useScrollDirection from '@/hooks/useScrollDirection'


// ----------------------------------------------------------------------
const RootStyle = styled('div')({
    display: 'flex',
})

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
}))
const FabStyle = styled(Fab)(({ theme }) => ({
    //background: 'linear-gradient(to right, #F5C043, #E78531)',
    background: alpha('#FFC34C', 0.5),
    fontWeight: 900,
    borderRadius: '100px',
    '&:hover': {
        backgroundColor: '#FFD95A',
        //background: alpha('#FFC34C', 0.5),
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
}))
// ----------------------------------------------------------------------

export default function Layout() {
    //const { scrolled } = useScrollDirection()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaderMessage, setLoaderMessage] = useState('')

    const auth = useSelector((state: any) => state.auth)

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            try {
                if (!auth.data?.roles?.includes('admin')) { // refresh
                    console.log('not an admin')
                    // load user infos
                    //const token = localStorage.getItem('token')
                    // revalidate validate admin
                    //let response
                    //if (token && token !== '') response = await dispatch(authValidate({}))
                    //if (!response?.payload.roles.includes('admin')) {
                    navigate('/login', { replace: true })
                    //}
                }
                else {
                    console.log('load admin lists')
                    setLoading(true)
                    // load data
                    //setLoaderMessage('Loading Lotty Essentials')
                    //await dispatch(lottyList())
                    // load lotteries
                    //setLoaderMessage('Loading Lotteries')
                    //await dispatch(lotteriesList())
                    // load tickets
                    //setLoaderMessage('Loading Tickets')
                    //await dispatch(ticketsList())
                    // load draws
                    //setLoaderMessage('Loading Draws')
                    //await dispatch(drawsList())
                    // load snapshots
                    //setLoaderMessage('Loading Snapshots')
                    //await dispatch(snapshotsList())
                    // load transactions
                    //setLoaderMessage('Loading Transactions')
                    //await dispatch(transactionsList())
                    // load distributors
                    //setLoaderMessage('Loading Distributors')
                    //await dispatch(distributorsList())
                    // load vouchers
                    //setLoaderMessage('Loading Vouchers')
                    //await dispatch(vouchersList())
                    setLoading(false)
                }
            }
            catch (error) {
                //setLoaderMessage('Error occured while loading data')
                console.error(error)
                navigate('/maintenance', { replace: true })
            }
        })()
    }, [dispatch, auth.data?.roles])

    //useEffect(() => {
    //  const token = localStorage.getItem('token')
    //  if (!token && !auth.roles.includes('admin')) {
    //    console.log('move to login')
    //    navigate('/login', { replace: true })
    //  }
    //}, [navigate, auth.roles])

    return (
        <RootStyle>
            <Topbar menus={menus} onOpenSidebar={() => setOpen(true)} />
            {/*
      <Sidebar menus={menus} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
  */}
            {/* Fab */}
            <Box
                role="presentation"
                // Place the button in the bottom right corner.
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                    zIndex: 1,
                }}
            >
                {/*
        <FabStyle
          component={Link}
          to={'#top'}
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
          color="primary"
          size="small"
          aria-label="Scroll back to top"
          disabled={scrolled === 0}
        >
          <KeyboardArrowUp fontSize="medium" />
        </FabStyle>
    */}
            </Box>
            <MainStyle>
                <Outlet />
                {/*<Footer />*/}
            </MainStyle>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <CircularProgress color="inherit" />
                    <Typography variant="caption" display="block" gutterBottom>
                        {loaderMessage}
                    </Typography>
                </Stack>
            </Backdrop>
        </RootStyle>
    )
}