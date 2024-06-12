import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SystemFilter, SystemFilterInput } from "src/client/types/graphql";
import { object, string, number, date, InferType } from "yup";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";

interface Props {
  data: SystemFilter;
  saveFunction: (input: SystemFilterInput) => Promise<unknown>;
  isOpen: boolean;
  onClose: () => void;
  savingState: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const formSchema = object().shape({
  Id: string().required(),
  OrderNo: number().integer().min(0).required(),
  RuleName: string().required().min(5),
  Ip: string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/,
      { message: "Invalid IP Address" }
    )
    .required(),
  SubnetId: string()
    .matches(/^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]|\*)$/, {
      message: "Must a number between 1 to 255 or use * for wildcard.",
    })
    .required(),
  DeviceId: string()
    .matches(/^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]|\*)$/, {
      message: "Must a number between 1 to 255 or use * for wildcard.",
    })
    .required(),
  FilterAction: string()
    .oneOf(["allow", "block", "ignore"])
    .required(),
});

const SystemFilterForm = ({ data, saveFunction, isOpen, onClose, savingState }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      OrderNo: 1,
      RuleName: "",
      Ip: "",
      SubnetId: "*",
      DeviceId: "*",
      FilterAction: "ignore",
    },
  });

  const onSubmit = (input: SystemFilterInput) => {
    if(savingState) return;
    saveFunction(input).then(() => onClose());
  };

  useEffect(() => {
    if (data) {
      // @ts-ignore - enum type vs plain string passed via FilterAction
      reset({
        Id: data.Id,
        OrderNo: data.OrderNo,
        RuleName: data.RuleName || "",
        Ip: data.Ip,
        SubnetId: data.SubnetId || "*",
        DeviceId: data.DeviceId || "*",
        FilterAction: data.FilterAction || "ignore",
      });
    }
  }, [data, reset]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} spacing={4}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update System Filter
          </Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("Id")} />
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  disabled={savingState}
                  id="rule-name"
                  label="Rule Name"
                  variant="outlined"
                  {...register("RuleName")}
                  error={!!errors.RuleName}
                  helperText={!!errors.RuleName ? errors.RuleName.message : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  disabled={savingState}
                  id="rule-order"
                  type="number"
                  label="Order Number"
                  variant="outlined"
                  {...register("OrderNo")}
                  error={!!errors.OrderNo}
                  helperText={!!errors.OrderNo ? errors.OrderNo.message : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  disabled={savingState}
                  id="ip-addr"
                  label="Source IP Address"
                  variant="outlined"
                  {...register("Ip")}
                  error={!!errors.Ip}
                  helperText={!!errors.Ip ? errors.Ip.message : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  disabled={savingState}
                  type="number"
                  id="subnet-id"
                  label="Subnet ID"
                  variant="outlined"
                  {...register("SubnetId")}
                  error={!!errors.SubnetId}
                  helperText={!!errors.SubnetId ? errors.SubnetId.message : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  disabled={savingState}
                  type="number"
                  id="device-id"
                  label="Device ID"
                  variant="outlined"
                  {...register("DeviceId")}
                  error={!!errors.DeviceId}
                  helperText={!!errors.DeviceId ? errors.DeviceId.message : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  select
                  disabled={savingState}
                  type="number"
                  id="filter-action"
                  label="Filter Action"
                  variant="outlined"
                  {...register("FilterAction")}
                  error={!!errors.FilterAction}
                  helperText={!!errors.FilterAction ? errors.FilterAction.message : ''}
                >
                    <MenuItem value="allow">Allow</MenuItem>
                    <MenuItem value="ignore">Ignore</MenuItem>
                    <MenuItem value="block">Block</MenuItem>
                </TextField>
              </Grid>
              <Grid
                xs={6}
                alignContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Button variant="outlined" disabled={savingState} onClick={(_evt) => onClose()}>
                  Cancel
                </Button>
              </Grid>
              <Grid
                xs={6}
                alignContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Button variant="contained" disabled={savingState} type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Stack>
    </Modal>
  );
};

export default SystemFilterForm;
