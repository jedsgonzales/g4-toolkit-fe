import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
// material
import { styled } from "@mui/material/styles";
import {
    Paper,
    Box,
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination,
    IconButton,
    Button,
} from "@mui/material";
// icons
import CloseIcon from "@mui/icons-material/Close";
// hooks
//import useSettings from '@/hooks/useSettings'
// components
import Page from "src/components/Page";
import SearchNotFound from "src/components/SearchNotFound";
import Scrollbar from "src/components/Scrollbar";
import CopyToClipboard from "src/components/CopyToClipboard";
import { ListHead, ListToolbar } from "src/components/table";
import DevicesCreate from "src/components/modals/DevicesCreate";
// redux
import { SmartG4Dispatch, SmartG4RootState } from "src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { devicesList, devicesRead } from "src/redux/devicesSlice";
// utils
//import numeral from 'numeral'
import { format } from "date-fns";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
    AddDeviceToRoomMutation,
    AddDeviceToRoomMutationVariables,
    DelDeviceMutation,
    DelDeviceMutationVariables,
    NetworkBroadcastersQuery,
    NetworkBroadcastersQueryVariables,
    NetworkDevicesQuery,
    NetworkDevicesQueryVariables,
    SetDeviceDescMutation,
    SetDeviceDescMutationVariables,
    SetDeviceNodeDescMutation,
    SetDeviceNodeDescMutationVariables,
} from "src/client/types/graphql";
import { QUERY_RSIP_LIST } from "src/client/models/rsips";
import {
    DEL_DEVICE,
    GET_DEVICES,
    SET_DEVICE_DESC,
    SET_DEVICE_LOCATION,
    SET_DEVICE_NODE_DESC,
} from "src/client/models/devices";
//import { applySortFilter, getComparator } from '@/utils/filterObjects'

// ----------------------------------------------------------------------
const TABLE_HEAD = [
    { id: "date", label: "Date", alignRight: false, sort: true },
    { id: "name", label: "Name", alignRight: false, sort: true },
];
// ----------------------------------------------------------------------
const TablePaginationStyle = styled(TablePagination)({
    textTransform: "uppercase",
    fontSize: "10px",
}) as typeof TablePagination;
// ----------------------------------------------------------------------

export default function DevicesList() {
    const api = useNetworkBroadcasterAPI();

    //const { themeStretch } = useSettings()
    //const theme = useTheme()
    const dispatch = useDispatch<SmartG4Dispatch>();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const devices = useSelector((state: SmartG4RootState) => state.devices);

    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [filter, setFilter] = useState("");
    const [filterBy, setFilterBy] = useState("devicename");
    const [limit, setLimit] = useState(10);

    const handleRequestSort = (event: any, property: string) => {
        setPage(0);
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleFilter = (event: any) => {
        setPage(0);
        setFilter(event.target.value);
    };

    const handleOpenForm = (id: any) => {
        if (id) {
            setSelectedItem(
                devices.data.items.find((obj: any) => obj.id === id) || {}
            );
        } else {
            setSelectedItem({});
        }
        setOpenForm(true);
    };

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeLimit = (event: any) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    useMemo(() => {
        (async () => {
            try {
                setLoading(true);
                console.log("fetch devices");
                //await dispatch(devicesList({ limit, page, orderBy, order, findBy: filterBy, find: filter }))
                await dispatch(devicesList({}));
                setLoading(false);
            } catch (error: any) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    action: (key) => (
                        <IconButton size="small" onClick={() => closeSnackbar(key)}>
                            <CloseIcon />
                        </IconButton>
                    ),
                });
                setLoading(false);
            }
        })();
    }, [dispatch]);

    return (
        <Page title={"Backoffice - Devices"}>
            {/* Modals */}
            <DevicesCreate
                device={selectedItem}
                open={openForm}
                handleClose={() => setOpenForm(false)}
            />

            <Stack direction="column" alignItems="center" justifyContent="center">
                {/* Top Section */}
                <Box
                    sx={{
                        minHeight: "500px",
                        width: "100%",
                        //backgroundImage: 'url(/static/overlay.svg), url(/static/home/hero.png)',
                        //backgroundPosition: 'center',
                        //backgroundSize: 'cover',
                        pt: 12,
                    }}
                >
                    <Stack direction="column" alignItems="center" justifyContent="center">
                        <Typography variant="h2" align="center">
                            Devices List
                        </Typography>
                        <Button variant="contained" disabled={true}>
                            Download Excel
                        </Button>
                    </Stack>

                    <Card
                        sx={{
                            borderRadius: 2,
                            px: 1,
                            mt: 8,
                            width: "90%",
                            mx: "auto",
                            overflow: "auto",
                        }}
                    >
                        <ListToolbar
                            filter={filter}
                            onFilter={handleFilter}
                        //filterBy={filterBy}
                        //handleAdd={() => handleOpenForm()}
                        />

                        <Scrollbar>
                            <TableContainer
                                component={Paper}
                                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
                            >
                                <Table>
                                    <ListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {loading && (
                                            <TableRow>
                                                <TableCell
                                                    align="center"
                                                    colSpan={TABLE_HEAD.length + 1}
                                                    sx={{ py: 3 }}
                                                >
                                                    <Typography variant="caption" align="center">
                                                        LOADING
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {devices.data.items.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    align="center"
                                                    colSpan={TABLE_HEAD.length + 1}
                                                    sx={{ py: 3 }}
                                                >
                                                    <SearchNotFound searchQuery={filter} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {devices.data.items.map((obj: any, idx: number) => {
                                            const { id, date, name } = obj;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={idx}
                                                    tabIndex={-1}
                                                    //role="checkbox"
                                                    //selected={isItemSelected}
                                                    //aria-checked={isItemSelected}
                                                    onClick={() => handleOpenForm(id)}
                                                >
                                                    <TableCell align="left">
                                                        <Typography variant="body2" noWrap>
                                                            {/*format(new Date(date), 'yyyy-MM-dd HH:mm:ss')*/}
                                                            {format(new Date(date), "MMM. dd, yyyy hh:mm a")}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={1}
                                                        >
                                                            <CopyToClipboard data={name} />
                                                            <Typography variant="body2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <TablePaginationStyle
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={devices.data.totalItems}
                            rowsPerPage={limit}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeLimit}
                        />
                    </Card>
                </Box>
            </Stack>
        </Page>
    );
}

const useNetworkBroadcasterAPI = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {
        data: rsipList,
        loading: loadingRsips,
        error: rsipListError,
        refetch: reloadRsipList,
    } = useQuery<NetworkBroadcastersQuery, NetworkBroadcastersQueryVariables>(
        QUERY_RSIP_LIST,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (rsipList) {
            //
        } else if (rsipListError) {
            enqueueSnackbar("RSIP List Loading Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [rsipList, rsipListError]);

    const [
        loadRsipDevices,
        {
            data: deviceList,
            loading: loadingDevices,
            error: devicesError,
            refetch: reloadDevices,
        },
    ] = useLazyQuery<NetworkDevicesQuery, NetworkDevicesQueryVariables>(
        GET_DEVICES,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (deviceList) {
            //
        } else if (devicesError) {
            enqueueSnackbar("Device List Loading Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [deviceList, devicesError]);

    const [
        setDeviceDesc,
        { data: deviceInfo, loading: savingDeviceDesc, error: setDeviceDescError },
    ] = useMutation<SetDeviceDescMutation, SetDeviceDescMutationVariables>(
        SET_DEVICE_DESC,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (deviceInfo) {
            enqueueSnackbar("Device Desc Set", {
                variant: "success",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });

            reloadDevices();
        } else if (setDeviceDescError) {
            enqueueSnackbar("Device Desc Setting Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [deviceInfo, setDeviceDescError]);

    const [
        setDeviceNodeDesc,
        {
            data: deviceNodeInfo,
            loading: savingDeviceNodeDesc,
            error: setDeviceNodeDescError,
        },
    ] = useMutation<
        SetDeviceNodeDescMutation,
        SetDeviceNodeDescMutationVariables
    >(SET_DEVICE_NODE_DESC, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (deviceNodeInfo) {
            enqueueSnackbar("Device Node Desc Set", {
                variant: "success",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });

            reloadRsipList();
        } else if (setDeviceNodeDescError) {
            enqueueSnackbar("Device Node Desc Setting Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [deviceNodeInfo, setDeviceNodeDescError]);

    const [
        setDeviceRoom,
        {
            data: setDeviceRoomResult,
            loading: settingDeviceRoom,
            error: setDeviceRoomError,
        },
    ] = useMutation<AddDeviceToRoomMutation, AddDeviceToRoomMutationVariables>(
        SET_DEVICE_LOCATION,
        {
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (setDeviceRoomResult) {
            enqueueSnackbar("Device Assigned To Location", {
                variant: "success",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });

            reloadRsipList();
        } else if (setDeviceRoomError) {
            enqueueSnackbar("Device Location Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [setDeviceRoomResult, setDeviceRoomError]);

    const [
        delDevice,
        { data: delDeviceResult, loading: deletingDevice, error: delDeviceError },
    ] = useMutation<DelDeviceMutation, DelDeviceMutationVariables>(DEL_DEVICE, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (delDeviceResult) {
            enqueueSnackbar("Device Deleted", {
                variant: "success",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });

            reloadRsipList();
        } else if (delDeviceError) {
            enqueueSnackbar("Device Deletion Failed", {
                variant: "error",
                action: (key) => (
                    <IconButton size="small" onClick={() => closeSnackbar(key)}>
                        <CloseIcon />
                    </IconButton>
                ),
            });
        }
    }, [delDeviceResult, delDeviceError]);

    const loading =
        loadingDevices ||
        loadingRsips ||
        savingDeviceDesc ||
        savingDeviceNodeDesc ||
        settingDeviceRoom ||
        deletingDevice;

    return {
        loadRsipDevices,
        setDeviceDesc,
        setDeviceNodeDesc,
        setDeviceRoom,
        delDevice,
        rsipList,
        deviceList,
        loading,
    };
};
