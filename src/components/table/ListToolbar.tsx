import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
// material
import { styled } from '@mui/material/styles'
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material'

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
        width: 320,
        //boxShadow: theme.customShadows.z8 
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        //borderColor: `${theme.palette.grey[500_32]} !important`
    }
}))

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    handleAdd: PropTypes.func,
}

export default function ListToolbar({ filterName, onFilterName, handleAdd }: any) {
    return (
        <RootStyle>
            <SearchStyle
                value={filterName}
                onChange={onFilterName}
                placeholder="Search name..."
                startAdornment={
                    <InputAdornment position="start">
                        {/* <Box component={IconButton} icon={SearchIcon} sx={{ color: 'text.disabled' }} /> */}
                        <IconButton><SearchIcon /></IconButton>
                    </InputAdornment>
                }
            />

            {handleAdd && (
                <Tooltip title="Add">
                    <IconButton onClick={() => handleAdd()}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </RootStyle>
    )
}
