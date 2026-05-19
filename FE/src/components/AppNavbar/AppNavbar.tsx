import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import synapseLogo from '../../assets/synapse-logo.jpeg';
import { useAuth } from '../../context/AuthContext';
import {
  activeNavButtonSx,
  appBarSx,
  brandSx,
  brandWrapperSx,
  logoSx,
  logoutButtonSx,
  navButtonSx,
  navStackSx,
  toolbarSx,
  userEmailSx,
} from './AppNavbar.styles';

const navItems = [
  { label: 'LifeStats', path: '/' },
  { label: 'Subjects', path: '/subjects' },
  { label: 'Analytics', path: '/analytics' },
];

export const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="sticky" sx={appBarSx}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={toolbarSx}>
          <Box sx={brandWrapperSx} onClick={() => navigate('/')}>
            <Box
              component="img"
              src={synapseLogo}
              alt="Synapse logo"
              sx={logoSx}
            />

            <Typography sx={brandSx}>Synapse</Typography>
          </Box>

          <Stack direction="row" spacing={0.75} sx={navStackSx}>
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={isActive ? activeNavButtonSx : navButtonSx}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={userEmailSx}>{user?.email}</Typography>

            <Button onClick={handleLogout} sx={logoutButtonSx}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
