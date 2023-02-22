import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { User } from "../../interfaces";

interface UserTableProps {
  rows: User[];
  loading: boolean;
}

const columns: GridColDef<User>[] = [
  {
    field: "login",
    headerName: "Login",
    flex: 1,
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Typography mr={1}>{row.login}</Typography>
        <Link to={`/detail/${row.login}`}>
          <OpenInNewRoundedIcon color="disabled" />
        </Link>
      </Stack>
    ),
  },
  {
    field: "id",
    headerName: "Id",
    flex: 1,
  },
];
export function UserTable({ rows, loading }: UserTableProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        getRowId={(row) => row.id}
        loading={loading}
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
      />
    </div>
  );
}
