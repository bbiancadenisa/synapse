import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/auth';
import {
  cardSx,
  pageSx,
  primaryButtonSx,
  secondaryTextSx,
  subtitleSx,
  titleSx,
} from './AuthPage.styles';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const isValid = email.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      setError(null);

      const data = await login({
        email: email.trim(),
        password,
      });

      loginUser(data.token, data.user);

      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <Box sx={pageSx}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={cardSx}>
          <Stack spacing={2.25}>
            <Box>
              <Typography sx={titleSx}>Welcome back</Typography>

              <Typography sx={subtitleSx}>
                Log in and continue your study flow.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              size="small"
            />

            <Button
              variant="contained"
              disabled={!isValid}
              onClick={handleSubmit}
              sx={primaryButtonSx}
            >
              Login
            </Button>

            <Typography sx={secondaryTextSx}>
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to="/register" underline="hover">
                Create one
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
