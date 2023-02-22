import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import {
  Avatar,
  Box,
  Container,
  Fade,
  Grid,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { getUser } from "../api";
import { Section } from "../components/common";
import { RepositoryTable, TableActions } from "../components/UserDetail";

export function UserDetail() {
  let { username } = useParams();
  const [search, setSearch] = useState<string | undefined>("");
  const loadUser = useAsyncCallback(getUser);

  const searchDebounce = useDebounce(search, 500);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 800,
      }}
    >
      <Container maxWidth="xl">
        <Section loader={loadUser} value={username}>
          {(result) => (
            <>
              <Paper
                sx={{
                  padding: 4,
                  maxWidth: 1422,
                }}
                elevation={3}
                variant="outlined"
                style={{ transformOrigin: "0 0 0" }}
                {...{ timeout: 1000 }}
              >
                <Fade
                  in
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 1000 }}
                >
                  <Grid container display="flex" alignItems="center">
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
                    <Grid item xs={2}>
                      <Stack direction="column">
                        <Typography variant="h4" fontWeight="bold">
                          {result.login}
                        </Typography>
                        <Typography variant="body2">
                          GitUser ID: #{result.id}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Stack direction="row">
                        <TodayRoundedIcon color="disabled" />
                        <Typography variant="subtitle1" ml={1} fontWeight="500">
                          {DateTime.fromISO(result.created_at).toFormat(
                            "LLL dd yyyy"
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Fade>
              </Paper>

              <TableActions search={search} setSearch={setSearch} />
              <Slide direction="up" in>
                <Grid container>
                  <Grid item xs={12}>
                    <RepositoryTable
                      url={result.html_url}
                      username={username ?? ""}
                      search={searchDebounce}
                    />
                  </Grid>
                </Grid>
              </Slide>
            </>
          )}
        </Section>
      </Container>
    </Box>
  );
}
