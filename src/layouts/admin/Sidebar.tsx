//import PropTypes from 'prop-types';
//import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
// components
import Logo from '@/components/Logo';
import Scrollbar from '@/components/Scrollbar';
import NavSection from '@/components/NavSection';
import { MHidden } from '@/components/@material-extend';
// redux
//import { useSelector } from 'react-redux';
//import { discoveryData, isConnected, peers } from '../../redux/slicers/webrtc/webrtcSlice';

//import sidebarConfig from './SidebarConfig';

//import { Icon } from '@iconify/react';
//import eyeFill from '@iconify/icons-eva/eye-fill';
//import castFill from '@iconify/icons-eva/cast-fill';
//import globeFill from '@iconify/icons-eva/globe-fill';
// https://akveo.github.io/eva-icons/#/?type=fill

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 300;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    flexShrink: 0,
    //width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

export default function Sidebar({ navConfig, isOpenSidebar, onCloseSidebar }) {

  const renderContent = (
    <Scrollbar className="sidebar-drawer"
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>
      <NavSection navConfig={navConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
