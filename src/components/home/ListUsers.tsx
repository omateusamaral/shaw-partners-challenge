import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { User } from "../../interfaces";

interface ListUsersProps {
  items: User[];
}

const ListUsers = memo(function listUsers({ items }: ListUsersProps) {
  return (
    <List sx={{ width: "100%", maxHeight: 600, bgcolor: "background.paper" }}>
      {items.map((item) => (
        <React.Fragment key={item.id + item.node_id + item.login}>
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack direction="row">
                  <Typography mr={1}>{item.login}</Typography>
                  <Link to={`/detail/${item.login}`}>
                    <OpenInNewRoundedIcon color="disabled" />
                  </Link>
                </Stack>
              }
              secondary={<React.Fragment>id: #{item.id}</React.Fragment>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
});

export { ListUsers };
