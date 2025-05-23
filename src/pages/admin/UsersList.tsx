import { useState, useMemo } from 'react'
import { useSnackbar } from 'notistack'
// material
import { styled } from '@mui/material/styles'
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
    Checkbox,
    Tooltip
} from '@mui/material'
// icons
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
//import DeleteIcon from '@mui/icons-material/Delete' 
// hooks
//import useSettings from '@/hooks/useSettings'
// components
import Page from 'src/components/Page'
import SearchNotFound from 'src/components/SearchNotFound'
import Scrollbar from 'src/components/Scrollbar'
import CopyToClipboard from 'src/components/CopyToClipboard'
import { ListHead, ListToolbar, HeadLabelsType } from 'src/components/table'
import UsersCreate from 'src/components/modals/UsersCreate'
// types
import {
    UserRole,
    UserWithRoles,
} from "src/client/types/graphql"
// redux
import { SmartG4Dispatch, SmartG4RootState } from "src/redux/store"
import { useSelector, useDispatch } from 'react-redux'
import { usersList } from 'src/redux/usersSlice'
// utils
//import numeral from 'numeral'
//import { format } from 'date-fns'
//import { applySortFilter, getComparator } from '@/utils/filterObjects'

// ----------------------------------------------------------------------
const TABLE_HEAD: Array<HeadLabelsType> = [
    { id: 'createdOn', label: 'date', alignRight: false, sort: true },
    { id: 'LastName', label: 'fullname', alignRight: false, sort: false },
    { id: 'Username', label: 'username', alignRight: false, sort: true },
    { id: 'Roles', label: 'roles', alignRight: false, sort: false },
    //{ id: 'Actions', label: '', alignRight: false, sort: false },
]
// ----------------------------------------------------------------------
const TablePaginationStyle = styled(TablePagination)({
    color: '#B19E77',
    textTransform: 'uppercase',
    fontFamily: 'Tourney',
    fontSize: '12px',
    fontWeight: 900,
}) as typeof TablePagination
// ----------------------------------------------------------------------

export default function UsersList() {
    //const { themeStretch } = useSettings()
    //const theme = useTheme()
    const dispatch = useDispatch<SmartG4Dispatch>()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const users = useSelector((state: SmartG4RootState) => state.users)

    const [loading, setLoading] = useState(false)

    //const [stats, setStats] = useState()
    const [openForm, setOpenForm] = useState(false)
    const [selectedItem, setSelectedItem] = useState<UserWithRoles | undefined>(undefined)

    const [selected, setSelected] = useState<Array<string>>([]);

    const [page, setPage] = useState(0)
    const [order, setOrder] = useState<'asc' | 'desc'>('desc')
    const [orderBy, setOrderBy] = useState('createdAt')
    const [filter, setFilter] = useState('')
    //const [filterBy, setFilterBy] = useState('username')
    const [limit, setLimit] = useState(10)

    const handleRequestSort = (event: unknown, property: string) => {
        console.log(event);
        setPage(0);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setFilter(event.target.value);
    }

    const handleOpenForm = (id: string) => {
        if (id) {
            const result = users?.data.items.find((obj: UserWithRoles) => obj.Id === id);
            result && setSelectedItem(result);
        }
        else {
            setSelectedItem(undefined);
        }
        setOpenForm(true);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    }

    const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = users.data.items.map((n) => n.Id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: string) => {
        const selectedIndex = selected?.indexOf(id);
        let newSelected: Array<string> = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleDelete = () => {
        console.log(selected)
    }

    useMemo(() => {
        (async () => {
            try {
                setLoading(true);
                console.log('fetch users');
                //await dispatch(usersList({ limit, page, orderBy, order, findBy: filterBy, find: filter }));
                await dispatch(usersList({ search: '' }));
                setLoading(false);
            }
            catch (error: unknown) {
                if (typeof error === "string") {
                    enqueueSnackbar(error, {
                        variant: 'error',
                        action: (key) => (
                            <IconButton size="small" onClick={() => closeSnackbar(key)}>
                                <CloseIcon />
                            </IconButton>
                        )
                    });
                } else if (error instanceof Error) {
                    enqueueSnackbar(error.message, {
                        variant: 'error',
                        action: (key) => (
                            <IconButton size="small" onClick={() => closeSnackbar(key)}>
                                <CloseIcon />
                            </IconButton>
                        )
                    });
                }
                setLoading(false);
            }
        })()
    }, [dispatch, closeSnackbar, enqueueSnackbar])

    //console.log(users)

    return (
        <Page title={'Backoffice - Users'} >
            {/* Modals */}
            <UsersCreate user={selectedItem} open={openForm} handleClose={() => setOpenForm(false)} />

            <Stack direction='column' alignItems='center' justifyContent='center'>

                {/* Top Section */}
                <Box sx={{
                    minHeight: '500px',
                    width: '100%',
                    //backgroundImage: 'url(/static/overlay.svg), url(/static/home/hero.png)',
                    //backgroundPosition: 'center',
                    //backgroundSize: 'cover',
                    pt: 12
                }}>
                    <Stack direction='column' alignItems='center' justifyContent='center'>
                        <Typography variant='h2' align='center'>
                            Users List
                        </Typography>
                    </Stack>

                    <Card sx={{
                        borderRadius: 2,
                        px: 1,
                        mt: 8,
                        width: '90%',
                        mx: 'auto',
                        overflow: 'auto'
                    }}>
                        <ListToolbar
                            filter={filter}
                            onFilter={handleFilter}
                        //filterBy={filterBy}
                        //handleAdd={() => handleOpenForm()}
                        />

                        <Scrollbar>
                            <TableContainer component={Paper} sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                <Table>
                                    <ListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        onRequestSort={handleRequestSort}
                                        rowCount={users.data.totalItems}
                                        numSelected={selected?.length || 0}
                                        onSelectAllClick={handleSelectAllClick}
                                        onAdd={() => handleOpenForm('')}
                                        onDelete={() => handleDelete()}
                                    />
                                    <TableBody>
                                        {loading && (
                                            <TableRow>
                                                <TableCell align="center" colSpan={TABLE_HEAD.length + 1} sx={{ py: 3 }}>
                                                    <Typography variant='caption' align='center'>LOADING</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {users.data.items.length === 0 && (
                                            <TableRow>
                                                <TableCell align="center" colSpan={TABLE_HEAD.length + 1} sx={{ py: 3 }}>
                                                    <SearchNotFound searchQuery={filter} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {users.data.items.map((user: UserWithRoles, idx: number) => {
                                            const { Id, CreatedOn, Username, FirstName, LastName, Roles } = user
                                            const roles = Roles?.map((role: UserRole) => role.RoleName)
                                            const isItemSelected = selected?.indexOf(Id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={idx}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                //onClick={() => handleOpenForm(Id)}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isItemSelected} onChange={() => handleClick(Id)} />
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="body2" noWrap>
                                                            {CreatedOn /* format(new Date(CreatedOn), 'yyyy-MM-dd HH:mm:ss') */}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction='row' alignItems='center' spacing={1}>
                                                            <Typography variant="body2" noWrap >
                                                                {FirstName} {LastName}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Stack direction='row' alignItems='center' spacing={1}>
                                                            <CopyToClipboard data={Username} />
                                                            <Typography variant="body2" noWrap >
                                                                {Username}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="body2" noWrap >
                                                            {roles?.join(',')}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Tooltip title='Edit this record'>
                                                            {/*
                                                            <EditIcon
                                                                onClick={() => handleOpenForm(Id)}
                                                                sx={{ cursor: 'pointer' }}
                                                                fontSize='small'
                                                            />
                            */}
                                                            <IconButton size="small" color="success" onClick={() => handleOpenForm(Id)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <TablePaginationStyle
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.data.totalItems}
                            rowsPerPage={limit}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeLimit}
                        />
                    </Card>
                </Box>
            </Stack>
        </Page>
    )
}
