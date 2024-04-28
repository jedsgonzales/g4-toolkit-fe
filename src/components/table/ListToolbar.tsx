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

const SearchStyle = styled(OutlinedInput)(() => ({
  width: 240,
  //transition: theme.transitions.create(['box-shadow', 'width'], {
  //  easing: theme.transitions.easing.easeInOut,
  //  duration: theme.transitions.duration.shorter
  //}),
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
  filter: PropTypes.string,
  onFilter: PropTypes.func,
  filterBy: PropTypes.string,
  addText: PropTypes.string,
  handleAdd: PropTypes.func,
}

export default function ListToolbar({ filter, onFilter, filterBy, addText, handleAdd }: any) {
  return (
    <RootStyle>

      {(onFilter) ? (
        <SearchStyle
          value={filter}
          onChange={onFilter}
          placeholder={`${filterBy}...`}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      ) : (
        <div></div>
      )}

      {handleAdd && (
        <Tooltip title={addText}>
          <IconButton onClick={() => handleAdd()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  )
}
