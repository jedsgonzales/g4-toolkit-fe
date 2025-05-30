import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// material
import {
    Backdrop,
    Box,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// icons
// components
// layout components
import menus from "src/assets/menusAdmin.json";
import Topbar from "./Topbar";
//import Sidebar from './Sidebar'
//import Footer from '@/components/Footer'
// redux
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { authValidate, authValidating } from "src/redux/authSlice";
import { SmartG4Dispatch, SmartG4RootState } from "src/redux/store";
// hooks
//import useScrollDirection from '@/hooks/useScrollDirection'

// ----------------------------------------------------------------------
const RootStyle = styled("div")({
    display: "flex",
});

const MainStyle = styled("div")(() => ({
    flexGrow: 1,
}));
// ----------------------------------------------------------------------

export default function Layout() {
    //const { scrolled } = useScrollDirection()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState("");

    const auth = useSelector((state: SmartG4RootState) => state.auth);

    const dispatch = useDispatch<SmartG4Dispatch>();
    const navigate = useNavigate();

    const { pathname } = useLocation();

    useEffect(() => {
        if (!auth.data && !pathname.startsWith("/login")) {
            navigate("/login", { replace: true });
        } else if (!auth.data && pathname.startsWith("/login")) {
            return;
        }

        if (auth.validating) return;

        const timeFrame = DateTime.local()
            .startOf("hour")
            .toFormat("yyyyMMddHHmmss");

        if (auth.data?.token) {
            if (auth.data?.validationMark !== timeFrame) {
                dispatch(authValidating(true));
                dispatch(
                    authValidate({ token: auth.data.token, validationCode: timeFrame })
                );
            } else {
                //navigate("/admin/users", { replace: true });
            }
        }

        (async () => {
            try {
                if (!auth.data?.roles?.find((r) => r.RoleName === "Admin")) {
                    // refresh
                    console.log("not an admin");
                    // load user infos
                    //const token = localStorage.getItem('token')
                    // revalidate validate admin
                    //let response
                    //if (token && token !== '') response = await dispatch(authValidate({}))
                    //if (!response?.payload.roles.includes('admin')) {
                    navigate("/login", { replace: true });
                    //}
                } else {
                    console.log("load admin lists");
                    setLoading(true);
                    // load data
                    setLoaderMessage('Loading Data')
                    setLoading(false);
                }
            } catch (error) {
                //setLoaderMessage('Error occured while loading data')
                console.error(error);
                navigate("/maintenance", { replace: true });
            }
        })();
    }, [dispatch, navigate, pathname, auth.data, auth.validating]);

    //useEffect(() => {
    //  const token = localStorage.getItem('token')
    //  if (!token && !auth.roles.includes('admin')) {
    //    console.log('move to login')
    //    navigate('/login', { replace: true })
    //  }
    //}, [navigate, auth.roles])

    return (
        <RootStyle>
            <Topbar menus={menus} isOpenSidebar={open} onOpenSidebar={() => setOpen(true)} />
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
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
    );
}
