import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm, Link as InertiaLink } from '@inertiajs/react';
import LoginLayout from '@/Components/Layouts/LoginLayout';

// Custom styles for the background
const styles = {
    background: {
        backgroundImage: 'url("/landingImages/bhaktapur2.jpg")', // Your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute', // Position it absolutely within the content area
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        animation: 'scaleBackground 10s infinite alternate', // Animation for background
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
        boxShadow: 3,
        maxWidth: 500,
        margin: 'auto',
        position: 'relative',
        zIndex: 1, // Ensure it sits above the background
    },
};

// Keyframes for the background animation
const keyframes = `
    @keyframes scaleBackground {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05); // Slight zoom effect
        }
        100% {
            transform: scale(1);
        }
    }
`;

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <LoginLayout>

            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    overflow: 'hidden', // Prevent scrolling
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={styles.background} />
                <Box sx={styles.loginContainer}>
                    {/* Title Typography */}
                    <Typography component="h6" variant="h6" sx={{ fontFamily: 'Kalimati', textAlign: 'center' }}>
                        राहत अनुदान व्यवस्थापन प्रणाली
                    </Typography>
                    <Avatar
                        src="/img/rms_logo.jpg"
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography component="h6" variant="h6" color="primary">
                        Sign in
                    </Typography>
                    {status && <div style={{ color: 'green' }}>{status}</div>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            size='small'
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            size='small'
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onChange={(e) => setData('remember', e.target.checked)} />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={processing}
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {canResetPassword && (
                                    <InertiaLink href={route('password.request')} variant="body2">
                                        Forgot password?
                                    </InertiaLink>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <style>{keyframes}</style>
            </Box>

        </LoginLayout>
    );
}
