import { CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAsyncCallback } from "react-async-hook";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { ErrorDialog } from "../components/ErrorDialog";

export function UserDetail() {
  let { username } = useParams();
  const loadUser = useAsyncCallback(getUser);

  useEffect(() => {
    if (username) {
      loadUser.execute(username);
    }
  }, [username]);

  return (
    <Grid container>
      <Grid item xs={12}>
        {loadUser.loading && <CircularProgress />}
        <ErrorDialog error={loadUser.error} onClose={loadUser.reset} />
      </Grid>
    </Grid>
  );
}
