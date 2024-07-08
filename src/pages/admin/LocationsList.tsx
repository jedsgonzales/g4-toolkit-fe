import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
// material
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
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// icons
import CloseIcon from "@mui/icons-material/Close";
// hooks
//import useSettings from '@/hooks/useSettings'
// components
import CopyToClipboard from "src/components/CopyToClipboard";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import SearchNotFound from "src/components/SearchNotFound";
import { ListHead, ListToolbar } from "src/components/table";

// redux
//import { locationsList, locationsRead } from 'src/redux/locationsSlice'
// utils
//import numeral from 'numeral'
import { useLazyQuery, useMutation } from "@apollo/client";
import { Edit } from "@mui/icons-material";
import {
  DELETE_AREA,
  LIST_AREA_BY_KEYWORD,
  LIST_PROPERTIES,
  LIST_PROPERTY_LEVELS,
  LIST_PROPERTY_LEVEL_UNITS,
  SAVE_PROPERTY,
  SAVE_PROPERTY_LEVEL,
  SAVE_PROPERTY_LEVEL_UNIT,
} from "src/client/models/locations";
import {
  Area,
  AreaByKeywordQuery,
  AreaByKeywordQueryVariables,
  DeleteAreaMutation,
  DeleteAreaMutationVariables,
  LevelAreaInput,
  LevelUnitsQuery,
  LevelUnitsQueryVariables,
  PropertiesQuery,
  PropertiesQueryVariables,
  PropertyLevelsQuery,
  PropertyLevelsQueryVariables,
  SavePropertyLevelMutation,
  SavePropertyLevelMutationVariables,
  SavePropertyMutation,
  SavePropertyMutationVariables,
  SavePropertyUnitMutation,
  SavePropertyUnitMutationVariables,
} from "src/client/types/graphql";
import { SmartG4TableState } from "src/client/types/table-state";
import LocationsForm, { FormInput } from "src/components/modals/LocationsForm";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { applySortFilter, getComparator } from '@/utils/filterObjects'

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "locationName", label: "Area Name", alignRight: false, sort: true },
  { id: "locationType", label: "Area Type", alignRight: false, sort: true },
  { id: "parentLoc", label: "Area Of", alignRight: false, sort: true },
  { id: "subAreaCount", label: "Sub Areas", alignRight: false, sort: true },
  { id: "deviceCount", label: "Active Devices", alignRight: false, sort: true },
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
  //const dispatch = useDispatch<SmartG4Dispatch>();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { property, level, unit } = useParams();
  const navigate = useNavigate();
  const {
    properties,
    selectedProperty,
    loadingProperties,
    savePropertyArea,
    levels,
    selectedLevel,
    loadingLevels,
    savePropertyLevel,
    units,
    selectedUnit,
    loadingUnits,
    savePropertyUnit,
    filterResult,
    filterLoading,
    selectProperty,
    selectLevel,
    selectUnit,
    setFilter,
    savingArea,
    textFilter,
    deletingArea,
    deleteAreaList,
  } = useLocationAPI({ property, level, unit });

  const loading =
    filterLoading || loadingLevels || loadingProperties || loadingUnits;

  const [tableState, setTableState] = useState<SmartG4TableState<Area>>({
    filter: "",
    page: 0,
    rowsPerPage: 5,
    selected: [],
    order: "desc",
    orderBy: "CreatedOn",
  });

  const [openLocation, setOpenLocation] = useState<FormInput>();
  const [deletePrompt, setDeletePrompt] = useState<boolean>();

  useEffect(() => {
    if(property){
      selectProperty(property);
    }
  }, [property]);

  useEffect(() => {
    if(level){
      selectLevel(level);
    }
  }, [level]);

  useEffect(() => {
    if(unit){
      selectUnit(unit);
    }
  }, [unit]);

  useEffect(() => {
    clearSelection();
    console.log('area levels', property, level, unit);
  }, [property, level, unit]);

  const handleRequestSort = (event: any, propertyKey: keyof Area) => {
    const isAsc =
      tableState.orderBy === propertyKey && tableState.order === "asc";
    setTableState((prev) => {
      return {
        ...prev,
        page: 0,
        order: isAsc ? "desc" : "asc",
        orderBy: propertyKey,
      };
    });
  };

  const handleFilter = (event: any) => {
    setTableState((prev) => {
      return {
        ...prev,
        page: 0,
        filter: event.target.value,
      };
    });
  };

  const handleChangePage = (event: any, newPage: number) => {
    setTableState((prev) => {
      return {
        ...prev,
        page: newPage,
      };
    });
  };

  const handleChangeLimit = (event: any) => {
    setTableState((prev) => {
      return {
        ...prev,
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      };
    });
  };

  const isSelected = (id: string) => {
    return tableState.selected.includes(id);
  };

  const setSelected = (id: string) => {
    if (!tableState.selected.includes(id)) {
      setTableState((prev) => {
        return { ...prev, selected: [...tableState.selected, id] };
      });
    }
  };

  const deSelect = (id: string) => {
    if (tableState.selected.includes(id)) {
      setTableState((prev) => {
        return {
          ...prev,
          selected: tableState.selected.filter((item) => id !== item),
        };
      });
    }
  };

  const clearSelection = () => {
    setTableState((prev) => {
      return {
        ...prev,
        selected: [],
      };
    });
  }

  const cancelDelete = () => {
    clearSelection();
    setDeletePrompt(false);
  };

  const confirmDelete = () => {
    deleteAreaList(tableState.selected.map((id) => Number(id)));
    cancelDelete();
  };

  const locations = !!textFilter
    ? filterResult?.AreaByKeyword
    : selectedProperty
    ? selectedLevel
      ? units?.LevelUnits
      : levels?.PropertyLevels
    : properties?.Properties;

  return (
    <Page title={"Backoffice - Locations"}>
      {/* Modals */}
      {!!openLocation && (
        <LocationsForm
          data={openLocation}
          handleClose={() => setOpenLocation(undefined)}
          handleSave={async (areaInput: FormInput) => {
            const { Type, ...data } = areaInput;

            if (openLocation.Type === "Property") {
              const input = { ...data, ParentAreaId: undefined };
              await savePropertyArea({
                variables: {
                  property: input,
                },
              });
            } else if (openLocation.Type === "Level") {
              await savePropertyLevel({
                variables: {
                  level: data,
                },
              });
            } else {
              await savePropertyUnit({
                variables: {
                  unit: data,
                },
              });
            }

            setOpenLocation(undefined);
          }}
          savingState={savingArea}
        />
      )}

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
            {/* <Button variant="contained" disabled={true}>
              Download Excel
            </Button> */}
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
              filter={tableState.filter || ""}
              onFilter={handleFilter}
              addText={
                selectedProperty ? (selectedLevel ? "Add Unit" : "Add Level") : "Add Property"
              }
              handleAdd={() =>
                setOpenLocation({
                  Details: "",
                  Id: null,
                  Name: "",
                  ParentAreaId: selectedLevel || selectedProperty || "",
                  Type: selectedProperty ? (selectedLevel ? "Unit" : "Level") : "Property",
                })
              }
              handleDel={() => {
                tableState.selected.length && setDeletePrompt(true);
              }}
              handleBackArea={selectedLevel || selectedProperty ? () => {
                clearSelection();
                if(selectedLevel){
                  selectLevel(undefined);
                  navigate(`/admin/locations/${property}`)
                } else if (selectedProperty) {
                  selectLevel(undefined);
                  selectProperty(undefined);
                  navigate(`/admin/locations`)
                }
              } : undefined}
              hasSelectedRows={!!tableState.selected.length}
            />

            <Scrollbar>
              <TableContainer
                component={Paper}
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Table>
                  <ListHead
                    order={tableState.order}
                    orderBy={tableState.orderBy}
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
                    {locations?.length === 0 && (
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={TABLE_HEAD.length + 1}
                          sx={{ py: 3 }}
                        >
                          <SearchNotFound searchQuery={tableState.filter} />
                        </TableCell>
                      </TableRow>
                    )}
                    {locations?.map((row, idx: number) => {
                      const itemIsSelected = isSelected(row.Id);

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
                              ? deSelect(row.Id)
                              : setSelected(row.Id)
                          }
                        >
                          <TableCell>
                            <Checkbox checked={itemIsSelected} />
                            <IconButton
                              aria-label="edit"
                              disabled={savingArea || deletingArea}
                              onClick={(evt) => {
                                evt.stopPropagation();
                                evt.preventDefault();
                                setOpenLocation({
                                  ...row,
                                  ParentAreaId: row.ParentAreaId
                                    ? Number(row.ParentAreaId)
                                    : 0,
                                });
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </TableCell>

                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <CopyToClipboard data={row.Name} />
                              <Typography variant="body2" noWrap>
                                { row.Type === "Property" ? <Link to={`/admin/locations/${row.Id}`}>{row.Name}</Link> : (
                                  row.Type === "Level" ? <Link to={`/admin/locations/${property}/${row.Id}`}>{row.Name}</Link> :
                                  <Link to={`/admin/locations/${property}/${level}/${row.Id}`}>{row.Name}</Link>
                                ) }
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {row.Type}
                          </TableCell>

                          <TableCell align="left">
                            {row.ParentArea?.Name || ""}
                          </TableCell>

                          <TableCell align="left">
                            {row.SubAreas?.length}
                          </TableCell>

                          <TableCell align="left">
                            {row.DeviceCount || 0}
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
              count={locations?.length || 0}
              rowsPerPage={tableState.rowsPerPage}
              page={tableState.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeLimit}
            />

            <Dialog
              open={!!deletePrompt}
              onClose={cancelDelete}
              aria-labelledby="delete-loc-title"
              aria-describedby="delete-loc-description"
            >
              <DialogTitle id="delete-loc-title">
                {"Delete Selected Locations?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="delete-loc-description">
                  Deleting these locations will auto remove all sub-locations, if there are any. Proceed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelDelete}>Cancel</Button>
                <Button onClick={confirmDelete} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Box>
      </Stack>
    </Page>
  );
}

interface LocationAPIProps { property?: any, level?: any, unit?: any }
const useLocationAPI = ({ property, level, unit }: LocationAPIProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [textFilter, setTextFilter] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<any>(property);
  const [selectedLevel, setSelectedLevel] = useState<any>(level);
  const [selectedUnit, setSelectedUnit] = useState<any>(unit);

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

  const [
    savePropertyArea,
    { loading: savingPropertyArea, data: propertySaved },
  ] = useMutation<SavePropertyMutation, SavePropertyMutationVariables>(
    SAVE_PROPERTY,
    {
      fetchPolicy: "network-only",
    }
  );

  const [
    savePropertyLevel,
    { loading: savingPropertyLevel, data: levelSaved },
  ] = useMutation<
    SavePropertyLevelMutation,
    SavePropertyLevelMutationVariables
  >(SAVE_PROPERTY_LEVEL, {
    fetchPolicy: "network-only",
  });

  const [savePropertyUnit, { loading: savingPropertyUnit, data: unitSaved }] =
    useMutation<SavePropertyUnitMutation, SavePropertyUnitMutationVariables>(
      SAVE_PROPERTY_LEVEL_UNIT,
      {
        fetchPolicy: "network-only",
      }
    );

  const [deleteArea, { loading: deletingArea }] = useMutation<
    DeleteAreaMutation,
    DeleteAreaMutationVariables
  >(DELETE_AREA, {
    fetchPolicy: "network-only",
  });

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
    }
  }, [selectedProperty, properties]);

  useEffect(() => {
    if (levels && selectedLevel !== undefined) {
      loadPropertyLevelUnits({
        variables: {
          levelId: Number(selectedLevel),
        },
      });
    }
  }, [selectedLevel, levels]);

  useEffect(() => {
    !!textFilter &&
      loadByKeyword({
        variables: {
          filter: textFilter,
        },
      });
  }, [textFilter]);

  useEffect(() => {
    propertySaved &&
      reloadProperties().then(() => {
        if (textFilter) {
          refetch();
        }
      });
  }, [propertySaved]);

  useEffect(() => {
    levelSaved &&
      reloadLevels().then(() => {
        if (textFilter) {
          refetch();
        }
      });
  }, [levelSaved]);

  useEffect(() => {
    unitSaved &&
      reloadUnits().then(() => {
        if (textFilter) {
          refetch();
        }
      });
  }, [unitSaved]);

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

  const deleteAreaList = (areaIds: number[]) => {
    deleteArea({
      variables: {
        areaIdList: areaIds,
      },
    }).finally(() => {
      if (!!textFilter) {
        refetch();
      }

      if (!selectedProperty) {
        reloadProperties();
      }

      if (selectedProperty) {
        reloadLevels();
      }

      if (selectedLevel) {
        reloadUnits();
      }
    });
  };

  return {
    properties,
    selectedProperty,
    loadingProperties,
    savePropertyArea,
    levels,
    selectedLevel,
    loadingLevels,
    savePropertyLevel,
    units,
    selectedUnit,
    loadingUnits,
    savePropertyUnit,
    filterResult: data,
    filterLoading: loading,
    selectProperty,
    selectLevel,
    selectUnit,
    setFilter,
    textFilter,
    savingArea: savingPropertyArea || savingPropertyLevel || savingPropertyUnit,
    deletingArea,
    deleteAreaList,
  };
};
