// material
import { Paper, Typography, PaperProps } from '@mui/material'

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  searchQuery: string
  other?: Object
}

export default function SearchNotFound({ searchQuery = '', ...other }: Props) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      { searchQuery && <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography> }
      
    </Paper>
  )
}
