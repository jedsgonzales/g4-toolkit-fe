import { useLazyQuery, useMutation } from "@apollo/client";
import { Delete, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import {
  DEL_SOURCE_FILTER,
  GET_EXISTING_FILTERS,
  GET_PENDING_FILTERS,
  UPDATE_SOURCE_FILTER,
} from "src/client/models/system_filters";
import {
  CurrentSourceFiltersQuery,
  CurrentSourceFiltersQueryVariables,
  DeleteFilterMutation,
  DeleteFilterMutationVariables,
  PendingSourceFiltersQuery,
  PendingSourceFiltersQueryVariables,
  SystemFilter,
  SystemFilterInput,
  UpdateFilterMutation,
  UpdateFilterMutationVariables,
} from "src/client/types/graphql";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import SearchNotFound from "src/components/SearchNotFound";
import SystemFilterForm from "src/components/SystemFilterForm";
import { collectionFilter } from "src/utils/filterObjects";

// ----------------------------------------------------------------------
const CurrentFilterCols = [
  /* { id: "ruleId", label: "", align: 'left', sort: false }, */
  { id: "orderNo", label: "Order", align: "left", sort: true },
  { id: "ruleName", label: "Rule Name", align: "left", sort: true },
  { id: "sourceIp", label: "Source IP", align: "left", sort: true },
  { id: "subnetId", label: "Subnet ID", align: "left", sort: false },
  { id: "deviceId", label: "Device ID", align: "left", sort: true },
  { id: "filterAction", label: "Filter Action", align: "left", sort: true },
  { id: "discoveryTime", label: "Detected On", align: "left" },
  { id: "modificationTime", label: "Modified On", align: "left" },
];

const PendingFilterCols = [
  { id: "orderNo", label: "Order", align: "left", sort: true },
  { id: "sourceIp", label: "Source IP", align: "left", sort: true },
  { id: "subnetId", label: "Subnet ID", align: "left", sort: false },
  { id: "deviceId", label: "Device ID", align: "left", sort: true },
  { id: "discoveryTime", label: "Detected On", align: "left" },
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
  selected: string[];
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
      selected: [],
    },
    pending: {
      filter: "",
      page: 0,
      rowsPerPage: 5,
      selected: [],
    },
  });

  const [deleteSelection, setDeleteSelection] = useState<keyof TableStates>();
  const [openFilter, setOpenFilter] = useState<SystemFilter>();

  const {
    currentFilters,
    pendingFilters,
    loading,
    setSystemTextFilter,
    setPendingTextFilter,
    saveFilter,
    savingFilter,
    deleteFilter,
    deletingFilter,
  } = useSystemFilterRecords();

  /** update filters for records as per table states */
  useEffect(() => {
    setSystemTextFilter(tableStates.current.filter);
    setPendingTextFilter(tableStates.pending.filter);
  }, [tableStates.current.filter, tableStates.pending.filter]);

  /** update selected rows when records updated */
  useEffect(() => {
    setTableStates((prev) => {
      return {
        ...prev,
        current: {
          ...prev.current,
          selected: prev.current.selected.filter((s) =>
            currentFilters.find((cf) => cf.Id === s)
          ),
        },
        pending: {
          ...prev.pending,
          selected: prev.pending.selected.filter((s) =>
            pendingFilters.find((cf) => cf.Id === s)
          ),
        },
      };
    });
  }, [currentFilters, pendingFilters]);

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

  const isSelected = (id: string, table: keyof TableStates) => {
    return tableStates[table].selected.includes(id);
  };

  const setSelected = (id: string, table: keyof TableStates) => {
    if (!tableStates[table].selected.includes(id)) {
      setTableStates(() => {
        return {
          ...tableStates,
          [table]: {
            ...tableStates[table],
            selected: [...tableStates[table].selected, id],
          },
        };
      });
    }
  };

  const deSelect = (id: string, table: keyof TableStates) => {
    if (tableStates[table].selected.includes(id)) {
      setTableStates(() => {
        return {
          ...tableStates,
          [table]: {
            ...tableStates[table],
            selected: tableStates[table].selected.filter((item) => id !== item),
          },
        };
      });
    }
  };

  const deleteFilterSelection = (table: keyof TableStates) => {
    setDeleteSelection(table);
  };

  const cancelDelete = () => {
    setDeleteSelection(undefined);
  };

  const confirmDelete = () => {
    if (!deleteSelection) return;

    deleteFilter(tableStates[deleteSelection].selected).then(() => {
      setTableStates(() => {
        setDeleteSelection(() => undefined);
        return {
          ...tableStates,
          [deleteSelection]: {
            ...tableStates[deleteSelection],
            selected: [],
          },
        };
      });
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
            pt: 12,
          }}
        >
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography variant="h4" align="center">
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
            <Stack direction="row">
              <Button
                variant="outlined"
                startIcon={<Delete />}
                disabled={!tableStates.current.selected.length}
                onClick={() => {
                  deleteFilterSelection("current");
                }}
              >
                Delete
              </Button>
            </Stack>
            <Scrollbar>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell key={"tool-col"} align="left">
                        {" "}
                      </TableCell>
                      {CurrentFilterCols.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align as TableCellProps["align"]}
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
                          colSpan={CurrentFilterCols.length + 1}
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
                          colSpan={CurrentFilterCols.length + 1}
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
                      const itemIsSelected = isSelected(row.Id, "current");
                      return (
                        <TableRow
                          hover
                          key={idx}
                          tabIndex={-1}
                          role="checkbox"
                          selected={itemIsSelected}
                          aria-checked={itemIsSelected}
                          onClick={() =>
                            itemIsSelected
                              ? deSelect(row.Id, "current")
                              : setSelected(row.Id, "current")
                          }
                        >
                          <TableCell align="left">
                            <Checkbox checked={itemIsSelected} />
                            <IconButton
                              aria-label="edit"
                              disabled={savingFilter || deletingFilter}
                              onClick={(evt) => {
                                evt.stopPropagation();
                                evt.preventDefault();
                                setOpenFilter({ ...row });
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
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
            <Typography variant="h4" align="center">
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
            <Stack direction="row">
              <Button
                variant="outlined"
                startIcon={<Delete />}
                disabled={!tableStates.pending.selected.length}
                onClick={() => {
                  deleteFilterSelection("pending");
                }}
              >
                Delete
              </Button>
            </Stack>
            <Scrollbar>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell key={"tool-col"} align="left">
                        {" "}
                      </TableCell>
                      {PendingFilterCols.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align as TableCellProps["align"]}
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
                          colSpan={PendingFilterCols.length + 1}
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
                          colSpan={PendingFilterCols.length + 1}
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
                      const itemIsSelected = isSelected(row.Id, "pending");

                      return (
                        <TableRow
                          hover
                          key={idx}
                          tabIndex={-1}
                          role="checkbox"
                          selected={itemIsSelected}
                          aria-checked={itemIsSelected}
                          onClick={() =>
                            itemIsSelected
                              ? deSelect(row.Id, "pending")
                              : setSelected(row.Id, "pending")
                          }
                        >
                          <TableCell>
                            <Checkbox checked={itemIsSelected} />
                            <IconButton
                              aria-label="edit"
                              disabled={savingFilter || deletingFilter}
                              onClick={(evt) => {
                                evt.stopPropagation();
                                evt.preventDefault();
                                setOpenFilter({
                                  ...row,
                                  FilterAction: "pending",
                                });
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>
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
      <Dialog
        open={!!deleteSelection}
        onClose={cancelDelete}
        aria-labelledby="delete-filter-title"
        aria-describedby="delete-filter-description"
      >
        <DialogTitle id="delete-filter-title">
          {"Delete Selected Filters?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-filter-description">
            Deleting these filters will remove these rules on the list. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {openFilter && (
        <SystemFilterForm
          data={openFilter}
          saveFunction={saveFilter}
          isOpen={!!openFilter}
          onClose={() => {
            setOpenFilter(undefined);
          }}
          savingState={savingFilter}
        />
      )}
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
      refetch: reloadPendingFilters,
      /* called: loadedPendingFilters, */
    },
  ] = useLazyQuery<
    PendingSourceFiltersQuery,
    PendingSourceFiltersQueryVariables
  >(GET_PENDING_FILTERS, { fetchPolicy: "network-only" });

  const [
    delSystemFilter,
    { data: deleteComplete, loading: deletingFilter, error: deleteFailed },
  ] = useMutation<DeleteFilterMutation, DeleteFilterMutationVariables>(
    DEL_SOURCE_FILTER,
    { fetchPolicy: "network-only" }
  );

  const [
    saveSystemFilter,
    { data: savingCompleted, loading: savingFilter, error: savingFailed },
  ] = useMutation<UpdateFilterMutation, UpdateFilterMutationVariables>(
    UPDATE_SOURCE_FILTER,
    { fetchPolicy: "network-only" }
  );

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

  useEffect(() => {
    if (savingCompleted) {
      enqueueSnackbar("Filter Updated", {
        variant: "info",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    } else if (savingFailed) {
      enqueueSnackbar("Filter Update Failed", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }

    reloadSystemFilters();
    reloadPendingFilters();
  }, [savingCompleted, savingFailed]);

  useEffect(() => {
    if (deleteComplete) {
      enqueueSnackbar("Filter(s) Deleted", {
        variant: "info",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    } else if (deleteFailed) {
      enqueueSnackbar("Filter Delete Failed", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }

    reloadSystemFilters();
    reloadPendingFilters();
  }, [deleteComplete, deleteFailed]);

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

  const deleteFilter = async (ids: string[]) => {
    return await delSystemFilter({
      variables: {
        filterIds: ids,
      },
    });
  };

  const saveFilter = async (input: SystemFilterInput) => {
    return await saveSystemFilter({
      variables: {
        filter: input,
      },
    });
  };

  return {
    currentFilters: inEffectFilters,
    pendingFilters: inPendingFilters,
    loading: loadingFilters || loadingPending,
    setSystemTextFilter,
    setPendingTextFilter,
    reload: () => {
      reloadSystemFilters();
    },
    deleteFilter,
    deletingFilter,
    saveFilter,
    savingFilter,
  };
};
