// material
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from '@mui/material';
// icons
import MenuIcon from '@mui/icons-material/Menu';
// components
import { MHidden } from '@/components/@material-extend';
import NavSectionH from '@/components/NavSectionH';
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

//const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  background: alpha(theme.palette.background.default, 0.10),
  //backgroundColor: 'transparent',
  //background: '#111722',
  //alignItems: 'center',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('sm')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));
// ----------------------------------------------------------------------

export default function Topbar({ navConfig, onOpenSidebar, isConnected, connect }) {
  const theme = useTheme();

  return (
    <RootStyle theme={theme}>
      <ToolbarStyle theme={theme}>
        <MHidden width="smUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <MenuIcon />
          </IconButton>
        </MHidden>

        <MHidden width="smDown">
          <NavSectionH navConfig={navConfig} />
        </MHidden>
        <Box sx={{ flexGrow: 1 }} />
        <AccountPopover />
      </ToolbarStyle>
    </RootStyle>
  );
}
