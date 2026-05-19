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

import authIllustration from '../../assets/auth-illustration.svg';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/auth';
import {
  formPanelSx,
  illustrationPanelSx,
  illustrationSx,
  linkSx,
  pageSx,
  primaryButtonSx,
  secondaryTextSx,
  shellSx,
  subtitleSx,
  titleSx,
} from './AuthPage.styles';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isValid = email.trim().length > 0 && password.length > 0;

  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const data = await login({
        email: email.trim(),
        password,
      });

      loginUser(data.token, data.user);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={pageSx}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={shellSx}>
          <Box sx={formPanelSx}>
            <Stack spacing={2.5} sx={{ width: '100%' }}>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                fullWidth
                required
                size="small"
              />

              <Button
                variant="contained"
                disabled={!isValid || submitting}
                onClick={handleSubmit}
                sx={primaryButtonSx}
              >
                {submitting ? 'Logging in...' : 'Login'}
              </Button>

              <Typography sx={secondaryTextSx}>
                Don&apos;t have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={linkSx}
                >
                  Create one
                </Link>
              </Typography>
            </Stack>
          </Box>

          <Box sx={illustrationPanelSx}>
            <Box
              component="img"
              src={authIllustration}
              alt="Study planning illustration"
              sx={illustrationSx}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
