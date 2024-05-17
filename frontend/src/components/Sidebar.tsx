import React from "react";
import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

const Sidebar = () => {
    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            width={240}
            bgcolor="background.paper"
            sx={{
                transition: "width 0.3s",
                overflow: "auto",
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#home">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Homepage" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Article />
                        </ListItemIcon>
                        <ListItemText primary="Pages" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Group />
                        </ListItemIcon>
                        <ListItemText primary="Groups" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Storefront />
                        </ListItemIcon>
                        <ListItemText primary="Marketplace" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Friends" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <AccountBox />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
        );
};

export default Sidebar;