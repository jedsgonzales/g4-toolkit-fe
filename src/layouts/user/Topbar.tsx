import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'
import { useLocation, matchPath } from 'react-router-dom'
//import { HashLink as Link } from 'react-router-hash-link'
import { Link as RouterLink } from "react-router-dom"
// material
import { styled, useTheme, alpha } from '@mui/material/styles'
import {
  Box,
  List,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material'
// icons
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// components
import { MHidden } from 'src/components/@material-extend'
import AccountPopover from './AccountPopover'

// ----------------------------------------------------------------------

//const DRAWER_WIDTH = 280
const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 64

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  background: alpha(theme.palette.background.default, 0.1),
  //backgroundColor: 'transparent',
  //background: '#111722',
  //alignItems: "center",
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("sm")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

const ButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  "&:hover": {
    color: '#333333',
    backgroundColor: 'transparent',
  },
  "&:disabled": {
    color: '#333333',
    background: 'linear-gradient(to bottom, #777777, #5F481B)',
  },
}))

const MenuStyle = styled(Menu)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}))

const MenuItemStyle = styled(MenuItem)({
  display: 'flex',
  //alignItems: 'center',
  //justifyContent: 'center'
})
// ----------------------------------------------------------------------

NavItem.propTypes = {
  menu: PropTypes.object,
  active: PropTypes.func,
  disabled: PropTypes.bool
}

function NavItem({ menu, active, disabled }: any) {
  const theme = useTheme()
  const navigate = useNavigate()

  const { title, path, children, badge, info, pathTest } = menu
  const isActiveRoot = active(path)

  const activeRootStyle = {
    color: theme.palette.primary.main,
    //fontWeight: 'fontWeightMedium',
    //bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    //'&:before': { display: 'block' }
  }

  const activeSubStyle = {
    color: theme.palette.primary.main,
    //color: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }

  const scrollWithOffset = (el: any) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY
    const yOffset = -60
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
  }

  //const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  //let newPath = path
  //if (path.substr(1, 1) !== '#') {
  //  newPath = path + '#'
  //}
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    path: string,
  ) => {
    //setSelectedIndex(index);
    navigate(path)
    setAnchorEl(null)
  }

  if (children) {
    return (
      <>
        <ButtonStyle
          id="customized-button"
          aria-controls="customized-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          {title}

          {open ? <KeyboardArrowDownIcon sx={{ width: 16, height: 16, ml: 1 }} /> : <KeyboardArrowUpIcon sx={{ width: 16, height: 16, ml: 1 }} />}
        </ButtonStyle>

        <MenuStyle
          id="customized-menu"
          MenuListProps={{
            'aria-labelledby': 'customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {children.map((item: any) => {
            const { title, path } = item
            const isActiveSub = active(path)

            return (
              <MenuItemStyle
                key={title}
                //component={RouterLink}
                //to={path}
                sx={{
                  ...(isActiveSub && activeSubStyle)
                }}
                //onClick={handleClose}
                onClick={(event) => handleMenuItemClick(event, path)}
                disableRipple
              >
                {title}
              </MenuItemStyle>
            )
          })}
        </MenuStyle>
      </>
    )
  }

  return (
    <>
      {badge ? (
        <ButtonStyle
          //component={Link}
          //to={(import.meta.env.VITE_ENV === 'testing' && pathTest) ? pathTest : path}
          //disabled={disabled}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
          //scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
          //scroll={(el: any) => scrollWithOffset(el)}
          onClick={(event) => handleMenuItemClick(event, path)}
        >
          <Badge badgeContent={badge} color="secondary">
            {title}
          </Badge>
        </ButtonStyle >
      ) : (
        <ButtonStyle
          //component={Link}
          //to={path}
          //disabled={disabled}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
          //scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
          //scroll={(el: any) => scrollWithOffset(el)}
          onClick={(event) => handleMenuItemClick(event, path)}
        >
          {title}
        </ButtonStyle >
      )}
    </>
  )
}

export default function Topbar({ menus, onOpenSidebar }: any) {
  const theme = useTheme()
  const { hash, pathname } = useLocation()
  //const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false)
  const match = (path: any) => {
    if (path.substr(1, 1) === '#') {
      return (path.replace('/', '') === hash ? true : false)
    }
    else {
      return (path ? !!matchPath({ path, end: false }, pathname) : false)
    }
  }

  return (
    <RootStyle theme={theme}>
      <ToolbarStyle theme={theme}>
        <RouterLink to="/">
          <Avatar
            src={`/vite.svg`}
          //sx={{ width: 50, height: 50 }}
          />
        </RouterLink>
        {/*
        <MHidden width="smUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <MenuIcon />
          </IconButton>
        </MHidden>
              */}

        {/* <MHidden width="smDown"> */}
        <Box sx={{ ml: 4 }}>
          <List disablePadding>
            {menus?.map((menu: any) => (
              <NavItem key={menu.title} menu={menu} active={match} />
            ))}
          </List>
        </Box>
        {/* </MHidden>
              */}
        <Box sx={{ flexGrow: 1 }} />
        <AccountPopover />
      </ToolbarStyle>
    </RootStyle>
  )
}
