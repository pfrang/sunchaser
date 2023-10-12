import { AppBar, Box, IconButton, Toolbar } from "@mui/material";

export const NavBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer"></IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit"></IconButton>
        <IconButton color="inherit"></IconButton>
      </Toolbar>
    </AppBar>
  );
};
