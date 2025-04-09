import { Link, Outlet } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    CssBaseline,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function App() {
    const [open, setOpen] = useState(false);


    return (
        <Container maxWidth='xl'>
            {/* Top AppBar */}
            <AppBar>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        PersonalTrainer
                    </Typography>
                </Toolbar>
                <CssBaseline />
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                <List>
                    <ListItem onClick={() => setOpen(false)}>
                        {/* Close the drawer when clicking on the arrow button */}
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowBackIosIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    {/* List of items in the drawer */}
                    <ListItem component={Link} to="/">
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} to="/trainings">
                        <ListItemButton>
                            <ListItemIcon>
                                <FitnessCenterIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trainings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Toolbar />

            <Outlet />

        </Container>
    );
}

export default App;
