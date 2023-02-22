import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAsyncCallback } from "react-async-hook";
import { listRepositories } from "../../api";
import { Repository } from "../../interfaces";
import { ErrorDialog } from "../common";

interface RepositoryTableProps {
  url: string;
  username: string;
  search?: string;
}

const columns: GridColDef<Repository>[] = [
  {
    field: "id",
    headerName: "Id",
    flex: 1,
  },

  {
    field: "full_name",
    headerName: "Name",
    flex: 1,
  },

  {
    field: "html_url",
    headerName: "Repository",
    flex: 1,
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Typography mr={1}>{row.html_url}</Typography>
        <Link href={row.html_url} target="_blank">
          <OpenInNewRoundedIcon color="disabled" />
        </Link>
      </Stack>
    ),
  },
];
export function RepositoryTable({
  url,
  username,
  search,
}: RepositoryTableProps) {
  const loadRepository = useAsyncCallback(listRepositories);

  useEffect(() => {
    loadRepository.execute(username, search);
  }, [url, search]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={loadRepository.result ?? []}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        getRowId={(row) => row.id}
        loading={loadRepository.loading}
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
      />
      <ErrorDialog
        error={loadRepository.error}
        onClose={loadRepository.reset}
        title="Could not list the repositories"
      />
    </div>
  );
}
