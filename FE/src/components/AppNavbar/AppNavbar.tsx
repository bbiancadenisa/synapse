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
import { useAuth } from '../../context/AuthContext';
import {
  activeNavButtonSx,
  appBarSx,
  brandSx,
  logoutButtonSx,
  navButtonSx,
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
        <Toolbar disableGutters>
          <Typography sx={brandSx}>Synapse</Typography>

          <Stack direction="row" spacing={1} sx={{ ml: 4 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

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
            <Typography sx={{ fontSize: 14, color: '#64748b' }}>
              {user?.email}
            </Typography>

            <Button onClick={handleLogout} sx={logoutButtonSx}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
