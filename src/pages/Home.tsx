import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { useDebounce } from "usehooks-ts";
import { listUsers } from "../api";
import { ErrorDialog } from "../components/ErrorDialog";
import { TableActions } from "../components/TableActions";
import { UserTable } from "../components/UserTable";

export default function Home() {
  const [since, setSince] = useState<string | undefined>("");
  const loadItems = useAsyncCallback(listUsers);

  const sinceDebounce = useDebounce(since, 500);
  useEffect(() => {
    loadItems.execute(sinceDebounce);
  }, [sinceDebounce]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 600,
      }}
    >
      <Container maxWidth="xl">
        <TableActions since={since} setSince={setSince} />
        <Grid container>
          <Grid item xs={12}>
            <UserTable
              rows={loadItems.result ?? []}
              loading={loadItems.loading}
            />
          </Grid>
        </Grid>
        <ErrorDialog
          error={loadItems.error}
          onClose={loadItems.reset}
          title="Could not list the users"
        />
      </Container>
    </Box>
  );
}
