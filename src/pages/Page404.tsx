import { Link } from 'react-router-dom'
// material
import {
  Box,
  Stack,
  Typography,
  Button,
} from '@mui/material'
// components
//import Page from 'src/components/Page'

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Stack direction='column' alignItems='center' justifyContent='center'>
      {/* Top Section */}
      <Box sx={{
        minHeight: '500px',
        width: '100%',
      }}>
        <Stack direction='row' alignItems='center' justifyContent='center' sx={{ mt: 18 }}>
          <Typography variant='h2'>
            Page not found
          </Typography>
        </Stack>
        <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ my: 6, p: 5, width: '80%', mx: 'auto' }}>
          <Typography variant='body1'>
            Sorry, we couldn’t find the page you’re looking for.
          </Typography>
          <Typography variant='h1'>
            404
          </Typography>
          <Button variant='contained' component={Link} to='/'>go back home</Button>
        </Stack>
      </Box>
    </Stack>
  )
}
