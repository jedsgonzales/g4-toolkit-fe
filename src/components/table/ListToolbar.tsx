// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Button,
  Grid,
  Stack,
} from "@mui/material";
// icons
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(() => ({
  width: 240,
  //transition: theme.transitions.create(['box-shadow', 'width'], {
  //  easing: theme.transitions.easing.easeInOut,
  //  duration: theme.transitions.duration.shorter
  //}),
  "&.Mui-focused": {
    width: 320,
    //boxShadow: theme.customShadows.z8
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    //borderColor: `${theme.palette.grey[500_32]} !important`
  },
}));

// ----------------------------------------------------------------------

interface Props {
  filter: String;
  onFilter: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  addText?: String;
  handleAdd?: () => void;
  handleDel?: () => void;
  hasSelectedRows?: boolean;
}

export default function ListToolbar({
  filter,
  onFilter,
  addText,
  handleAdd,
  hasSelectedRows,
  handleDel,
}: Props) {
  return (
    <RootStyle>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        {onFilter ? (
          
            <SearchStyle
              value={filter}
              onChange={onFilter}
              placeholder={`keyword...`}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          
        ) : null}
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            {handleAdd && (
                <Tooltip title={addText}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleAdd()}
                    size="large"
                  >
                    {addText}
                  </Button>
                </Tooltip>
            )}

            {hasSelectedRows && handleDel && (
                <Tooltip title="Delete Selectioon">
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleDel()}
                    size="large"
                  >
                    Delete
                  </Button>
                </Tooltip>
            )}
          </Stack>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
