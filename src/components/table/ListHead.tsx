import PropTypes from 'prop-types'
// material
import { styled } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import { Button, Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material'

// ----------------------------------------------------------------------
const TableSortLabelStyle = styled(TableSortLabel)(({ theme }) => ({
    color: '#B19E77',
    textTransform: 'uppercase',
    fontFamily: 'Tourney',
    fontSize: '12px',
    fontWeight: 900,
}))
// ----------------------------------------------------------------------

ListHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    headLabel: PropTypes.array,
    onRequestSort: PropTypes.func,
    onClaim: PropTypes.func,
}
/*
interface Props {
    order?: Array<string>
    orderBy?: string
    headLabel?: Array<string>
    onRequestSort?: Function
    onClaim?: Function
  }
  */
export default function ListHead({
    order,
    orderBy,
    headLabel,
    onRequestSort,
    onClaim,
}: any) {
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell: any, idx: number) => (
                    <TableCell
                        key={idx}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
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
