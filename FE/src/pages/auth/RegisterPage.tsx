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
import { register } from '../../services/auth';
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

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = password === confirmPassword;

  const isValid =
    email.trim().length > 0 &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    passwordsMatch;

  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      const data = await register({
        email: email.trim(),
        password,
      });

      loginUser(data.token, data.user);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to register');
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
                <Typography sx={titleSx}>Create account</Typography>

                <Typography sx={subtitleSx}>
                  Start building healthier study habits.
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
                helperText="Minimum 6 characters"
              />

              <TextField
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                fullWidth
                required
                size="small"
                error={confirmPassword.length > 0 && !passwordsMatch}
                helperText={
                  confirmPassword.length > 0 && !passwordsMatch
                    ? 'Passwords do not match'
                    : ' '
                }
              />

              <Button
                variant="contained"
                disabled={!isValid || submitting}
                onClick={handleSubmit}
                sx={primaryButtonSx}
              >
                {submitting ? 'Creating account...' : 'Register'}
              </Button>

              <Typography sx={secondaryTextSx}>
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  sx={linkSx}
                >
                  Login
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
