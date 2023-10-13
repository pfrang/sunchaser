import { useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ height: "50px" }} />
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#f5f5f5",
          padding: "16px",
          borderTop: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={handleToggle} fullWidth>
          {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </Button>
        <Collapse in={isOpen}>
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="body1" align="center">
              This is the collapsible content. It can be any HTML element or
              React component.
            </Typography>
          </Box>
        </Collapse>
      </Box>
    </>
  );
};
