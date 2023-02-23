import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { listUsers } from "../api";
import { ListUsers, TableActions } from "../components/home";
import { User } from "../interfaces";

export default function Home() {
  const [since, setSince] = useState<string | undefined>("");

  const [items, setItems] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState(30);
  const sinceDebounce = useDebounce(since, 500);

  async function handleLoadMore() {
    try {
      const response = await listUsers(
        sinceDebounce,
        pageSize >= 100 ? 100 : pageSize + 30
      );
      setItems(response);
      setPageSize(pageSize + 30);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadItems(sinceDebounce: string | undefined) {
    try {
      const response = await listUsers(sinceDebounce, pageSize);
      setItems(response);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadItems(sinceDebounce);
  }, [sinceDebounce]);
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
        <TableActions since={since} setSince={setSince} />
        <Grid container>
          <Grid item xs={12} maxHeight={500} overflow="auto">
            <ListUsers items={items} />
          </Grid>
          <Grid
            item
            xs={12}
            mt={2}
            justifyContent="center"
            display="center"
            alignItems="center"
          >
            <Button onClick={handleLoadMore} disabled={pageSize >= 100}>
              Load more
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
