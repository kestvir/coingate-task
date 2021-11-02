import { Box, Typography } from "@mui/material";

export default function Hello() {
  return (
    <Box mt={25} height="100vh" display="flex" justifyContent="center">
      <Typography variant="h1" component="h1">
        Hello World!
      </Typography>
    </Box>
  );
}
