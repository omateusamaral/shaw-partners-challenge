import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { useAsyncCallback } from "react-async-hook";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { Section } from "../components/common";

export function UserDetail() {
  let { username } = useParams();
  const loadUser = useAsyncCallback(getUser);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 400,
      }}
    >
      <Container maxWidth="xl">
        <Section loader={loadUser} value={username}>
          {(result) => (
            <>
              <Paper
                sx={{
                  padding: 4,
                  width: "100%",
                }}
                elevation={3}
                variant="outlined"
              >
                <Grid container>
                  <Grid item xs={2}>
                    <Avatar
                      src={result.avatar_url}
                      variant="rounded"
                      sx={{
                        minWidth: 150,
                        minHeight: 150,
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Stack direction="column">
                      <Typography variant="h6" fontWeight="bold">
                        {result.login}
                      </Typography>
                      <Typography variant="body2">ID: {result.id}</Typography>
                      <Typography variant="subtitle1">
                        Created at:{" "}
                        {DateTime.fromISO(result.created_at).toFormat(
                          "mm-dd-yyyy"
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </Section>
      </Container>
    </Box>
  );
}
