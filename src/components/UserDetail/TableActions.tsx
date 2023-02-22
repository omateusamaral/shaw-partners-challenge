import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { Grid, Tooltip, Typography } from "@mui/material";
import { SearchInput } from "../common";

interface TableActionsProps {
  search: string | undefined;
  setSearch: (since: string) => void;
}
export function TableActions({
  search: since,
  setSearch: setSince,
}: TableActionsProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSince(event.target.value);
  }
  return (
    <Grid container display="flex" alignItems="center" mb={1} mt={2}>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <SearchInput
          onChange={handleChange}
          value={since}
          placeHolder="Search"
          label={
            <Grid container>
              <Grid item display="flex" flexDirection="row">
                <Typography variant="body1" mr={1}>
                  Search
                </Typography>
                <Tooltip
                  title="This search can include:
  
  owner: Repositories that are owned by the authenticated user.
  
  collaborator: Repositories that the user has been added to as a collaborator.
  
  organization_member: Repositories that the user has access to through being a member of an organization. This includes every repository on every team that the user is on.
  
  Default: owner,collaborator,organization_member"
                >
                  <InfoRoundedIcon color="disabled" fontSize="small" />
                </Tooltip>
              </Grid>
            </Grid>
          }
        />
      </Grid>
    </Grid>
  );
}
