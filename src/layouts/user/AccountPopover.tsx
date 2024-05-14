import { useRef, useState } from 'react'
// material
import { alpha } from '@mui/material/styles'
import { Button, Box, Divider, Typography, Avatar, IconButton } from '@mui/material'
// components
import MenuPopover from 'src/components/MenuPopover'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { authReset } from 'src/redux/authSlice'

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function AccountPopover() {
  //const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth)

  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleLogout = async () => {
    await dispatch(authReset())
    //navigate('/login', { replace: true })
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar alt={auth.data?.firstname} src={auth.data?.avatarUrl} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {auth.data?.firstname + ' ' + auth.data?.lastname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth.data?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
