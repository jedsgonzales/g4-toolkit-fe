import { Helmet } from 'react-helmet-async'
import { forwardRef, ReactNode } from 'react'
// material
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

interface Props {
  children?: ReactNode
  title?: string
}
export type Ref = HTMLDivElement

const Page = forwardRef<Ref, Props>(({ children, title, ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
))

export default Page