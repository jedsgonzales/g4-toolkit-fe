import { useEffect } from "react";
// materials
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
// form
import * as Yup from "yup";
// utils
// hooks
// redux
// components
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LevelAreaInput } from "src/client/types/graphql";
import Scrollbar from "src/components/Scrollbar";
import { number, string } from "yup";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

interface DialogProps {
  children: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const BootstrapDialogTitle = (props: DialogProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface FormInput extends Omit<LevelAreaInput, "ParentAreaId"> {
  Type?: string;
  ParentAreaId: number;
}

interface Props {
  data: FormInput;
  handleClose: () => void;
  handleSave: (input: FormInput) => void;
  savingState: boolean;
}

const validationSchema = Yup.object({
  Id: string().optional().nullable(),
  Name: string().required("Name is required"),
  Details: string().optional().nullable(),
  ParentAreaId: number().required().min(0).default(0),
});

export default function LocationsForm({
  data,
  handleClose,
  handleSave,
  savingState,
}: Props) {
  //const dispatch = useDispatch()
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  // const isMountedRef = useIsMountedRef()

  // const [openConfirm, setOpenConfirm] = useState(false)

  const initialValues: FormInput = {
    Id: data.Id || null,
    Name: data.Name || "",
    Details: data?.Details || null,
    ParentAreaId: data?.ParentAreaId || 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<Omit<FormInput, "Type">>(validationSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (formData: FormInput) => {
    handleSave(formData);
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore - enum type vs plain string passed via FilterAction
      reset({
        Id: data?.Id || null,
        Name: data?.Name || "",
        Details: data?.Details || "",
        ParentAreaId: data?.ParentAreaId || 0,
      });
    }
  }, [data, reset]);

  return (
    <BootstrapDialog
      open={!!data}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <BootstrapDialogTitle
        /* id="customized-dialog-title" */ onClose={handleClose}
      >
        Location
      </BootstrapDialogTitle>
      {/* <Confirm open={openConfirm} handleClose={() => setOpenConfirm(false)} handleConfirm={handleDelete} /> */}
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("Id")} />
        <input type="hidden" {...register("ParentAreaId")} />
        <DialogContent>
          <Scrollbar
            sx={{
              height: "400px",
              "& .simplebar-content": {
                height: "100%",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register("Name")}
                    error={!!errors.Name}
                    helperText={errors.Name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Details"
                    {...register("Details")}
                    error={!!errors.Details}
                    helperText={errors.Details?.message}
                  />
                </Grid>
              </Grid>
            </Box>
          </Scrollbar>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            loading={savingState}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
