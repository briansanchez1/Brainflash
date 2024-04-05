import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NewModal from "./modal";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../helpers/axios_helper";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // used to switch between pages
  const navigate = useNavigate();

  // used to  log out
  const handleLogout = () => {
    apiAuth.logout();
  };

  // sends user to dashboard
  const handleDashboard = () => {
    navigate("/");
  };

  // sends users to settings
  const handleSettings = () => {
    navigate("/settings");
  };

  // sends user to category view
  const handleCategories = () => {
    navigate("/categories");
    setAnchorElNav(null);
  };

  // sends user to deck view
  const handleDecks = () => {
    navigate("/decks");
    setAnchorElNav(null);
  };

  // sends user to pfe view
  const handlePFE = () => {
    navigate("/pfe");
    setAnchorElNav(null);
  };

  // sends user to flashcard view
  const handleFlashcards = () => {
    navigate("/flashcards");
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".25rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Brainflash
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCategories}>
                <Typography textAlign="center">Your Categories</Typography>
              </MenuItem>
              <MenuItem onClick={handleDecks}>
                <Typography textAlign="center">Your Decks</Typography>
              </MenuItem>
              <MenuItem onClick={handlePFE}>
                <Typography textAlign="center">Your Review Sessions</Typography>
              </MenuItem>
              <MenuItem onClick={handleFlashcards}>
                <Typography textAlign="center">View All Cards</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Brainflash
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            <Button
              onClick={handleCategories}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Your Categories
            </Button>
            <Button
              onClick={handleDecks}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Your Decks
            </Button>
            <Button
              onClick={handlePFE}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Your Review Sessions
            </Button>
            <Button
              onClick={handleFlashcards}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              View All Cards
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{
                mr: 3,
                bgcolor: "#BDBDBD",
                color: "#fff",
                width: 36,
                height: 36,
              }}
            >
              <NewModal id="modal" focus={"flashcard"} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="User" src=" " sx={{ color: "#000" }} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleDashboard}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
