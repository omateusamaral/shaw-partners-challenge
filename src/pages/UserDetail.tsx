import GitHubIcon from "@mui/icons-material/GitHub";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
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
        height: 600,
      }}
    >
      <Container maxWidth="xl">
        <Section loader={loadUser} value={username}>
          {(result) => (
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Slide direction="up" in>
                  <Avatar
                    src={result.avatar_url}
                    variant="circular"
                    sx={{
                      minWidth: 294,
                      minHeight: 294,
                    }}
                  />
                </Slide>
                <Slide direction="up" in>
                  <Grid item xs={12} mb={2}>
                    <Stack direction="column">
                      <Typography variant="h4" fontWeight="bold">
                        {result.login}
                      </Typography>
                      <Typography
                        variant="body1"
                        alignItems="center"
                        display="flex"
                      >
                        <GitHubIcon
                          color="disabled"
                          fontSize="small"
                          sx={{
                            mr: 1,
                          }}
                        />{" "}
                        GitUser ID: #{result.id}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="500"
                        alignItems="center"
                        display="flex"
                      >
                        <TodayRoundedIcon
                          color="disabled"
                          sx={{
                            mr: 1,
                          }}
                          fontSize="small"
                        />
                        {DateTime.fromISO(result.created_at).toFormat(
                          "LLL dd yyyy"
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                </Slide>
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      width: "50%",
                    }}
                  />
                  <Typography variant="subtitle1">{result.bio}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={9}>
                <TableActions search={search} setSearch={setSearch} />
                <RepositoryTable
                  url={result.html_url}
                  username={username ?? ""}
                  search={searchDebounce}
                />
              </Grid>
            </Grid>
          )}
        </Section>
      </Container>
    </Box>
  );
}
