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
  TableHead,
  TableCellProps,
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
import UsersCreate from "src/components/modals/UsersCreate";
// redux
import { useSelector, useDispatch } from "react-redux";
//import { usersList, usersRead } from 'src/redux/usersSlice'
// utils
//import numeral from 'numeral'
import { format } from "date-fns";
import { SmartG4Dispatch, SmartG4RootState } from "src/redux/store";
import { useLazyQuery } from "@apollo/client";
import {
  GET_EXISTING_FILTERS,
  GET_PENDING_FILTERS,
} from "src/client/models/system_filters";
import {
  CurrentSourceFiltersQuery,
  CurrentSourceFiltersQueryVariables,
  PendingSourceFiltersQuery,
  PendingSourceFiltersQueryVariables,
} from "src/client/types/graphql";
import { collectionFilter } from "src/utils/filterObjects";

// ----------------------------------------------------------------------
const CurrentFilterCols = [
  /* { id: "ruleId", label: "", align: 'left', sort: false }, */
  { id: "orderNo", label: "Order", align: 'left', sort: true },
  { id: "ruleName", label: "Rule Name", align: 'left', sort: true },
  { id: "sourceIp", label: "Source IP", align: 'left', sort: true },
  { id: "subnetId", label: "Subnet ID", align: 'left', sort: false },
  { id: "deviceId", label: "Device ID", align: 'left', sort: true },
  { id: "filterAction", label: "Filter Action", align: 'left', sort: true },
  { id: "discoveryTime", label: "Detected On", align: 'left' },
  { id: "modificationTime", label: "Modified On", align: 'left' },
];

const PendingFilterCols = [
  { id: "orderNo", label: "Order", align: 'left', sort: true },
  { id: "sourceIp", label: "Source IP", align: 'left', sort: true },
  { id: "subnetId", label: "Subnet ID", align: 'left', sort: false },
  { id: "deviceId", label: "Device ID", align: 'left', sort: true },
  { id: "discoveryTime", label: "Detected On", align: 'left' },
];

// ----------------------------------------------------------------------
const TablePaginationStyle = styled(TablePagination)({
  color: "#B19E77",
  textTransform: "uppercase",
  fontFamily: "Tourney",
  fontSize: "12px",
  fontWeight: 900,
}) as typeof TablePagination;
// ----------------------------------------------------------------------

interface TableState {
  filter: string;
  page: number;
  rowsPerPage: number;
}

interface TableStates {
  current: TableState;
  pending: TableState;
}

export default function SystemFilterList() {
  /* const dispatch = useDispatch<SmartG4Dispatch>(); */
  /* const { enqueueSnackbar, closeSnackbar } = useSnackbar(); */

  const [tableStates, setTableStates] = useState<TableStates>({
    current: {
      filter: "",
      page: 0,
      rowsPerPage: 5,
    },
    pending: {
      filter: "",
      page: 0,
      rowsPerPage: 5,
    },
  });

  const {
    currentFilters,
    pendingFilters,
    loading,
    setSystemTextFilter,
    setPendingTextFilter,
  } = useSystemFilterRecords();

  useEffect(() => {
    setSystemTextFilter(tableStates.current.filter);
    setPendingTextFilter(tableStates.pending.filter);
  }, [tableStates.current.filter, tableStates.pending.filter]);

  const handleCurrentChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    handleChangePage(newPage, "current");
  };

  const handlePendingChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    handleChangePage(newPage, "pending");
  };

  const handleChangePage = (newPage: number, table: keyof TableStates) => {
    setTableStates((prev) => {
      return { ...prev, [table]: { ...prev[table], page: newPage } };
    });
  };

  const handleCurrentChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChangeRowsPerPage(parseInt(event.target.value, 10), "current");
  };

  const handlePendingChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChangeRowsPerPage(parseInt(event.target.value, 10), "pending");
  };

  const handleChangeRowsPerPage = (value: number, table: keyof TableStates) => {
    setTableStates((prev) => {
      return {
        ...prev,
        [table]: { ...prev[table], page: 0, rowsPerPage: value },
      };
    });
  };

  return (
    <Page title={"Admin - Filters"}>
      {/* Modals */}
      {/* <UsersCreate user={selectedItem} open={openForm} handleClose={() => setOpenForm(false)} /> */}

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
              System Filters
            </Typography>
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
            <Scrollbar>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Table>
                <TableHead>
                    <TableRow>
                      {CurrentFilterCols.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align as TableCellProps['align']}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={CurrentFilterCols.length}
                          sx={{ py: 3 }}
                        >
                          <Typography variant="caption" align="center">
                            LOADING...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {currentFilters.length === 0 && (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={CurrentFilterCols.length}
                          sx={{ py: 3 }}
                        >
                          <SearchNotFound
                            searchQuery={tableStates.current.filter}
                          />
                        </TableCell>
                      </TableRow>
                    )}

                    {(tableStates.current.rowsPerPage > 0
                      ? currentFilters.slice(
                          tableStates.current.page *
                            tableStates.current.rowsPerPage,
                          tableStates.current.page *
                            tableStates.current.rowsPerPage +
                            tableStates.current.rowsPerPage
                        )
                      : currentFilters
                    ).map((row, idx: number) => {
                      return (
                        <TableRow
                          hover
                          key={idx}
                          tabIndex={-1}
                          //role="checkbox"
                          //selected={isItemSelected}
                          //aria-checked={isItemSelected}
                          // onClick={() => handleOpenForm(id)}
                        >
                          <TableCell align="left">{row.OrderNo}</TableCell>
                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Typography variant="body2" noWrap>
                                {row.RuleName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Typography variant="body2" noWrap>
                                {row.Ip}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.SubnetId}</TableCell>
                          <TableCell align="left">{row.DeviceId}</TableCell>

                          <TableCell align="left">{row.FilterAction}</TableCell>

                          <TableCell align="left">
                            <Typography variant="body2" noWrap>
                              {format(
                                new Date(row.DetectedOn),
                                "MMM. dd, yyyy hh:mm a"
                              )}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Typography variant="body2" noWrap>
                              {format(
                                new Date(row.UpdatedOn),
                                "MMM. dd, yyyy hh:mm a"
                              )}
                            </Typography>
                          </TableCell>

                          {/* <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <CopyToClipboard data={email} />
                              <Typography variant="body2" noWrap>
                                {email}
                              </Typography>
                            </Stack>
                          </TableCell> */}

                          {/* <TableCell align="left">
                            <Typography variant="body2" noWrap>
                              {roles.join(",")}
                            </Typography>
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePaginationStyle
              rowsPerPageOptions={[5, 25, 100, { label: "All", value: -1 }]}
              component="div"
              count={currentFilters.length}
              rowsPerPage={tableStates.current.rowsPerPage}
              page={tableStates.current.page}
              onPageChange={handleCurrentChangePage}
              onRowsPerPageChange={handleCurrentChangeRowsPerPage}
            />
          </Card>
        </Box>

        <Box
          sx={{
            minHeight: "500px",
            width: "100%",
            pt: 12,
          }}
        >
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography variant="h2" align="center">
              Pending System Filters
            </Typography>
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
            <Scrollbar>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Table>
                <TableHead>
                    <TableRow>
                      {PendingFilterCols.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align as TableCellProps['align']}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={PendingFilterCols.length}
                          sx={{ py: 3 }}
                        >
                          <Typography variant="caption" align="center">
                            LOADING...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {pendingFilters.length === 0 && (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={PendingFilterCols.length}
                          sx={{ py: 3 }}
                        >
                          <SearchNotFound
                            searchQuery={tableStates.pending.filter}
                          />
                        </TableCell>
                      </TableRow>
                    )}

                    {(tableStates.pending.rowsPerPage > 0
                      ? pendingFilters.slice(
                          tableStates.pending.page *
                            tableStates.pending.rowsPerPage,
                          tableStates.pending.page *
                            tableStates.pending.rowsPerPage +
                            tableStates.pending.rowsPerPage
                        )
                      : pendingFilters
                    ).map((row, idx: number) => {
                      return (
                        <TableRow
                          hover
                          key={idx}
                          tabIndex={-1}
                          //role="checkbox"
                          //selected={isItemSelected}
                          //aria-checked={isItemSelected}
                          // onClick={() => handleOpenForm(id)}
                        >
                          <TableCell align="left">{row.OrderNo}</TableCell>
                          
                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Typography variant="body2" noWrap>
                                {row.Ip}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.SubnetId}</TableCell>
                          <TableCell align="left">{row.DeviceId}</TableCell>

                          <TableCell align="left">
                            <Typography variant="body2" noWrap>
                              {format(
                                new Date(row.DetectedOn),
                                "MMM. dd, yyyy hh:mm a"
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePaginationStyle
              rowsPerPageOptions={[5, 25, 100, { label: "All", value: -1 }]}
              component="div"
              count={pendingFilters.length}
              rowsPerPage={tableStates.pending.rowsPerPage}
              page={tableStates.pending.page}
              onPageChange={handlePendingChangePage}
              onRowsPerPageChange={handlePendingChangeRowsPerPage}
            />
          </Card>
        </Box>
      </Stack>
    </Page>
  );
}

const useSystemFilterRecords = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [systemTextFilter, setSystemTextFilter] = useState("");
  const [pendingTextFilter, setPendingTextFilter] = useState("");

  const [
    loadSystemFilters,
    {
      data: systemFilters,
      loading: loadingFilters,
      error: filtersError,
      called: loadedSystemFilters,
      refetch: reloadSystemFilters,
    },
  ] = useLazyQuery<
    CurrentSourceFiltersQuery,
    CurrentSourceFiltersQueryVariables
  >(GET_EXISTING_FILTERS, { fetchPolicy: "network-only" });

  const [
    loadPendingSystemFilters,
    {
      data: pendingData,
      loading: loadingPending,
      error: pendingError,
      /* called: loadedPendingFilters, */
    },
  ] = useLazyQuery<
    PendingSourceFiltersQuery,
    PendingSourceFiltersQueryVariables
  >(GET_PENDING_FILTERS, { fetchPolicy: "network-only" });

  const [currentFilters, setCurrentFilters] = useState<
    CurrentSourceFiltersQuery["CurrentSourceFilters"]
  >([]);

  const [pendingFilters, setPendingFilters] = useState<
    PendingSourceFiltersQuery["PendingSourceFilters"]
  >([]);

  useEffect(() => {
    loadSystemFilters();
  }, []);

  useEffect(() => {
    if (systemFilters) {
      setCurrentFilters(systemFilters.CurrentSourceFilters);
    } else if (filtersError) {
      setCurrentFilters([]);
      enqueueSnackbar("Unable to load System Filters", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [systemFilters, filtersError]);

  useEffect(() => {
    if (loadedSystemFilters) {
      loadPendingSystemFilters();
    }
  }, [currentFilters]);

  useEffect(() => {
    if (pendingData) {
      setPendingFilters(pendingData.PendingSourceFilters);
    } else if (pendingError) {
      setPendingFilters([]);
      enqueueSnackbar("Unable to load Pending System Filters", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [pendingData, pendingError]);

  const inEffectFilters = useMemo(() => {
    return !!systemTextFilter
      ? collectionFilter(currentFilters, systemTextFilter)
      : currentFilters;
  }, [systemTextFilter, currentFilters]);

  const inPendingFilters = useMemo(() => {
    return !!pendingTextFilter
      ? collectionFilter(pendingFilters, pendingTextFilter)
      : pendingFilters;
  }, [pendingTextFilter, pendingFilters]);

  return {
    currentFilters: inEffectFilters,
    pendingFilters: inPendingFilters,
    loading: loadingFilters || loadingPending,
    setSystemTextFilter,
    setPendingTextFilter,
    reload: () => {
      reloadSystemFilters();
    },
  };
};
