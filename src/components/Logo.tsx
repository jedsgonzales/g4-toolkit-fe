// material
import { Box, BoxProps } from '@mui/material'

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    sx: Object
}

export default function Logo({ sx }: Props) {
    return <Box component="img" src="/static/home/logo.png" sx={{ width: 50, height: 50, ...sx }} />
}
