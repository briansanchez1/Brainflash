import React, { useState } from "react";
import {
  CardContent,
  Card,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ActionCard({ content, onClick, actions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardActionArea onClick={() => (onClick ? onClick() : null)}>
        <CardContent>
          {content}
          {actions && (
            <>
              <IconButton
                onClick={handleMenuClick}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                aria-label="settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                disableRipple // This will disable the ripple effect on the IconButton
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
              >
                {actions.map((action, index) => (
                  <div onClick={handleMenuClose} key={index}>
                    {action}
                  </div>
                ))}
              </Menu>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function CardAction({ label, onClick }) {
  const handleCardAction = (event) => {
    onClick();
  };

  return (
    <MenuItem onClick={(event) => handleCardAction(event)}>{label}</MenuItem>
  );
}
