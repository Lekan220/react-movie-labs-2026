import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { useNavigate } from "react-router";

import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { AuthContext } from "../../contexts/AuthContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ toggleDarkMode, darkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const menuOptions = user
    ? [
        { label: "Home", path: "/" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Top Rated", path: "/top-rated" },
        { label: "Trending", path: "/trending" },
        { label: "Upcoming", path: "/upcoming" },
        { label: "Dashboard", path: "/dashboard" },
        { label: "My Reviews", path: "/my-reviews" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Top Rated", path: "/top-rated" },
        { label: "Trending", path: "/trending" },
        { label: "Upcoming", path: "/upcoming" },
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>

          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >

                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}

                {user && (
                  <MenuItem onClick={logout}>
                    Logout
                  </MenuItem>
                )}

              </Menu>

              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}

                  {opt.label === "Trending" && (
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: '0.75rem',
                        color: 'red'
                      }}
                    >
                      Hot!
                    </span>
                  )}
                </Button>
              ))}

              {user && (
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              )}

              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </>
          )}

        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;