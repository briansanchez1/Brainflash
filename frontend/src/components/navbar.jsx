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
    <AppBar sx={{ backgroundColor: "#e6a4b4" }} position="static">
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
              color: "#000",
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
              color="#000"
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
              <MenuItem
                onClick={handleDecks}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Typography textAlign="center">Decks</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCategories}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Typography textAlign="center">Categories</Typography>
              </MenuItem>

              <MenuItem
                onClick={handlePFE}
                sx={{
                  borderBottom: "1px solid black",
                }}
              >
                <Typography textAlign="center">Review Sessions</Typography>
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
              m: "auto",
              display: { xs: "flex", md: "none" },
              fontSize: { xs: " 40px" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#000",
              textDecoration: "none",
            }}
          >
            BF
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            <Button
              onClick={handleDecks}
              disableRipple
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                ":hover": {
                  bgcolor: "hsla(249, 17%, 100%, 0.33)",
                  transition: "0.2s",
                },
              }}
            >
              Decks
            </Button>
            <Button
              onClick={handleCategories}
              disableRipple
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                ":hover": {
                  bgcolor: "hsla(249, 17%, 100%, 0.33)",
                  transition: "0.2s",
                },
              }}
            >
              Categories
            </Button>

            <Button
              onClick={handlePFE}
              disableRipple
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                ":hover": {
                  bgcolor: "hsla(249, 17%, 100%, 0.33)",
                  transition: "0.2s",
                },
              }}
            >
              Review Sessions
            </Button>
            <Button
              onClick={handleFlashcards}
              disableRipple
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                ":hover": {
                  bgcolor: "hsla(249, 17%, 100%, 0.33)",
                  transition: "0.2s",
                },
              }}
            >
              View All Cards
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <NewModal id="modal" focus={"flashcard"} />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt="User"
                src=" "
                sx={{
                  bgcolor: "#dec0b1",
                  color: "#000",
                  transition: "0.2s",
                  ":hover": {
                    bgcolor: "#b5a69f",
                    color: "#000",
                    border: "none",
                  },
                }}
              />
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
