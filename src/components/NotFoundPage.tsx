import { Box, Typography } from "@mui/material";

export function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h1" style={{ color: "black", marginRight: 2 }}>
        404
      </Typography>

      <Typography variant="h6" style={{ color: "black" }}>
        | Could not found the page
      </Typography>
    </Box>
  );
}
