import { Grid, TextField, Typography } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";

interface TableActionsProps {
  since: string | undefined;
  setSince: (since: string) => void;
}
export function TableActions({ since, setSince }: TableActionsProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (!Number(event.target.value) && event.target.value.length > 0) {
      setSince("0");
    } else {
      setSince(event.target.value);
    }
  }
  return (
    <Grid container display="flex" alignItems="center" mb={2}>
      <Grid item xs={6}>
        <Typography variant="h4">Users</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="flex-end">
        <TextField
          label="Search"
          placeholder="A user ID. Only return users with an ID greater than this ID."
          sx={{
            width: 450,
          }}
          variant="standard"
          value={since}
          onChange={handleChange}
          InputProps={{
            endAdornment: <GridSearchIcon color="disabled" />,
          }}
        />
      </Grid>
    </Grid>
  );
}
