import PropTypes from 'prop-types'
// material
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

Logo.propTypes = {
    sx: PropTypes.object
}

export default function Logo({ sx }: any) {
    return <Box component="img" src="/static/home/logo.png" sx={{ width: 50, height: 50, ...sx }} />
}
