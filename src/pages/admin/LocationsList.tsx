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
import LocationsCreate from "src/components/modals/LocationsCreate";
// redux
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
//import { locationsList, locationsRead } from 'src/redux/locationsSlice'
// utils
//import numeral from 'numeral'
import { format } from "date-fns";
import { useLazyQuery } from "@apollo/client";
import {
  LIST_AREA_BY_KEYWORD,
  LIST_PROPERTIES,
  LIST_PROPERTY_LEVELS,
  LIST_PROPERTY_LEVEL_UNITS,
} from "src/client/models/locations";
import {
  AreaByKeywordQuery,
  AreaByKeywordQueryVariables,
  LevelUnitsQuery,
  LevelUnitsQueryVariables,
  PropertiesQuery,
  PropertiesQueryVariables,
  PropertyLevelsQuery,
  PropertyLevelsQueryVariables,
} from "src/client/types/graphql";
//import { applySortFilter, getComparator } from '@/utils/filterObjects'

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false, sort: true },
  { id: "name", label: "Name", alignRight: false, sort: true },
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

export default function LocationsList() {
  //const { themeStretch } = useSettings()
  //const theme = useTheme()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const locations = useSelector((state: any) => state.locations);

  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [filter, setFilter] = useState("");
  /* const [filterBy, setFilterBy] = useState("locationname"); */
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
      setSelectedItem(locations.data.items.find((obj: any) => obj.id === id));
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
        console.log("fetch locations");
        //await dispatch(locationsList({ limit, page, orderBy, order, findBy: filterBy, find: filter }))
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
  }, [page, limit, orderBy, order, /* filterBy,  */filter]);

  useMemo(() => {
    (async () => {
      try {
        //setLoading(true)
        if (!stats) {
          //const response = await dispatch(locationsRead({ id: 'stats' }))
          //setStats(response.payload)
          //console.log(response.payload)
        }
        //setLoading(false)
      } catch (error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          ),
        });
        //setLoading(false)
      }
    })();
  }, []);

  return (
    <Page title={"Backoffice - Locations"}>
      {/* Modals */}
      <LocationsCreate
        location={selectedItem}
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
              Locations List
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
              // filterBy={filterBy}
              // handleAdd={() => handleOpenForm()}
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
                    {locations.data.items.length === 0 && (
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
                    {locations.data.items.map((obj: any, idx: number) => {
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
              count={locations.data.totalItems}
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

const useLocationAPI = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [textFilter, setTextFilter] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any>();
  const [selectedLevel, setSelectedLevel] = useState<any>();
  const [selectedUnit, setSelectedUnit] = useState<any>();

  const [
    loadPropertyLocations,
    {
      data: properties,
      loading: loadingProperties,
      error: propertyListError,
      called: loadedProperties,
      refetch: reloadProperties,
    },
  ] = useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(LIST_PROPERTIES, {
    fetchPolicy: "network-only",
  });

  const [
    loadPropertyLevels,
    {
      data: levels,
      loading: loadingLevels,
      error: levelListError,
      called: loadedLevels,
      refetch: reloadLevels,
    },
  ] = useLazyQuery<PropertyLevelsQuery, PropertyLevelsQueryVariables>(
    LIST_PROPERTY_LEVELS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [
    loadPropertyLevelUnits,
    {
      data: units,
      loading: loadingUnits,
      error: unitListError,
      called: loadedUnits,
      refetch: reloadUnits,
    },
  ] = useLazyQuery<LevelUnitsQuery, LevelUnitsQueryVariables>(
    LIST_PROPERTY_LEVEL_UNITS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [loadByKeyword, { data, loading, error, called, refetch }] =
    useLazyQuery<AreaByKeywordQuery, AreaByKeywordQueryVariables>(
      LIST_AREA_BY_KEYWORD,
      {
        fetchPolicy: "network-only",
      }
    );

  useEffect(() => {
    loadPropertyLocations();
  }, []);

  useEffect(() => {
    propertyListError &&
      enqueueSnackbar("Properties Loading Failed", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
  }, [propertyListError]);

  useEffect(() => {
    levelListError &&
      enqueueSnackbar("Levels Loading Failed", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
  }, [levelListError]);

  useEffect(() => {
    unitListError &&
      enqueueSnackbar("Units Loading Failed", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
  }, [unitListError]);

  useEffect(() => {
    if (properties && selectedProperty !== undefined) {
      loadPropertyLevels({
        variables: {
          propertyId: Number(selectedProperty),
        },
      });
    } else {
      enqueueSnackbar("Property List: Not Loaded", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedLevel !== undefined) {
      loadPropertyLevelUnits({
        variables: {
          levelId: Number(selectedLevel),
        },
      });
    } else {
      enqueueSnackbar("Property Level List: Not Loaded", {
        variant: "error",
        action: (key) => (
          <IconButton size="small" onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [selectedLevel]);

  useEffect(() => {
    !!textFilter &&
      loadByKeyword({
        variables: {
          filter: textFilter,
        },
      });
  }, [textFilter]);

  // exports
  const selectProperty = (id?: string) => {
    setSelectedProperty(id);
  };

  const selectLevel = (id?: string) => {
    setSelectedLevel(id);
  };

  const selectUnit = (id?: string) => {
    setSelectedUnit(id);
  };

  const setFilter = (filter: string) => {
    if (!!filter) {
      setSelectedProperty(undefined);
      setSelectedLevel(undefined);
      setSelectedUnit(undefined);

      setTextFilter(filter);
    }
  };

  return {
    properties,
    loadingProperties,
    levels,
    loadingLevels,
    units,
    loadingUnits,
    filterResult: data,
    filterLoading: loading,
    selectProperty,
    selectLevel,
    selectUnit,
    setFilter,
  };
};
