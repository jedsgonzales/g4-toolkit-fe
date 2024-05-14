// material
import { styled } from '@mui/material/styles'
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material'
// icons
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

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

interface Props {
  filter: String
  onFilter: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  filterBy: String
  addText?: String
  handleAdd?: Function
}

export default function ListToolbar({ filter, onFilter, filterBy, addText, handleAdd }: Props) {
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
