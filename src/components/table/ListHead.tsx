import { MouseEvent } from 'react'
// material
import { styled } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { Button, Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material'

// ----------------------------------------------------------------------
const TableSortLabelStyle = styled(TableSortLabel)(() => ({
  textTransform: 'uppercase',
  fontSize: '14px',
  fontWeight: 600,
}))
// ----------------------------------------------------------------------

interface headCellProps {
  id: String
  alignRight: 'right' | 'left'
  label: String
  sort: Boolean
}

interface Props {
  order?: any
  orderBy?: String
  headLabel?: any
  onRequestSort?: any
  onClaim?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ListHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  onClaim,
}: Props) {
  const createSortHandler = (property: String) => (event: MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell: headCellProps, idx: number) => (
          <TableCell
            key={idx}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort ? (
              <TableSortLabelStyle
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabelStyle>
            ) : (
              <TableSortLabelStyle
                hideSortIcon
                disabled
              >
                {headCell.label}
              </TableSortLabelStyle>
            )}
          </TableCell>
        ))}
        {onClaim && (
          <TableCell align='center'>
            <Button variant='contained' onClick={onClaim}>claim all</Button>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}
