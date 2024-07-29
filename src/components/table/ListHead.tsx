import { MouseEvent } from "react";
// material
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import {
    Box,
    TableRow,
    TableCell,
    TableHead,
    TableSortLabel,
    Checkbox,
    IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
// ----------------------------------------------------------------------
const TableSortLabelStyle = styled(TableSortLabel)(() => ({
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: 600,
}));
// ----------------------------------------------------------------------

export type headCell = {
    id: string;
    alignRight: boolean;
    label: string;
    sort: boolean;
}

interface Props {
    order?: "asc" | "desc";
    orderBy?: string;
    headLabel: Array<headCell>;
    onRequestSort: (event: MouseEvent<HTMLSpanElement>, property: string) => void;
    onAdd?: React.MouseEventHandler<HTMLButtonElement>;
    onDelete?: React.MouseEventHandler<HTMLButtonElement>;
    rowCount: number,
    numSelected: number,
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ListHead({
    order,
    orderBy,
    headLabel,
    onRequestSort,
    onAdd,
    onDelete,
    rowCount,
    numSelected,
    onSelectAllClick
}: Props) {
    const createSortHandler =
        (property: string) => (event: MouseEvent<HTMLSpanElement>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headLabel.map((headCell: headCell, idx: number) => (
                    <TableCell
                        key={idx}
                        align={headCell.alignRight ? "right" : "left"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.sort ? (
                            <TableSortLabelStyle
                                hideSortIcon
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box sx={{ ...visuallyHidden }}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabelStyle>
                        ) : (
                            <TableSortLabelStyle hideSortIcon disabled>
                                {headCell.label}
                            </TableSortLabelStyle>
                        )}
                    </TableCell>
                ))}
                {onDelete && (
                    <TableCell align="right">
                        <IconButton color="primary" onClick={onAdd}>
                            <AddIcon />
                        </IconButton>
                        <IconButton color="error" onClick={onDelete} disabled={numSelected <= 0}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}
