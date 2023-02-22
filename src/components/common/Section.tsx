import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { UseAsyncReturn } from "react-async-hook";

interface SectionProps<T> {
  loader: UseAsyncReturn<T>;
  value?: string;
  children: (result: T) => JSX.Element;
}

export function Section<T>({ loader, value, children }: SectionProps<T>) {
  async function handleRetry() {
    await loader.execute(...(loader.currentParams ? loader.currentParams : []));
  }
  useEffect(() => {
    loader.execute(value);
  }, []);

  if (loader.loading || loader.result === undefined) {
    return (
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (Boolean(loader.error)) {
    return (
      <Typography variant="body1">
        An error ocurred,
        <Button onClick={handleRetry}>please try again </Button>
      </Typography>
    );
  }

  return <> {children(loader.result)}</>;
}
