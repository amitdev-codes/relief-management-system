import { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import toastr from 'toastr';
import GoBackButton from '@/Components/Mui/GoBackButton';
import { Card, Grid, CardContent, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormHelperText, FormControlLabel, Switch } from '@mui/material';

const UserForm = (props) => {
    const { auth, user, errors: serverErrors } = props;
    const [name, setName] = useState(user ? user.name : '');
    const [nameNp, setNameNp] = useState(user ? user.name_np : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [mobile_number, setMobileNumber] = useState(user ? user.mobile_number : '');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(user ? user.status : false);
    const [errors, setErrors] = useState(serverErrors || {});

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? '' : 'Name is required';
        tempErrors.name_np = nameNp ? '' : 'Name In nepali is required';
        tempErrors.email = email ? '' : 'Email is required';
        tempErrors.mobile_number = mobile_number ? '' : 'Mobile is required';
        tempErrors.password = user ? '' : (password ? '' : 'Password is required'); // Only require password for new users
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('_method', user ? 'PUT' : 'POST');
        formData.append('name', name);
        formData.append('name_np', nameNp);
        formData.append('email', email);
        formData.append('mobile_number', mobile_number);
        if (password) {
            formData.append('password', password); // Only append password if it's not empty
        }
        formData.append('status', status ? '1' : '0');

        const routeName = user ? 'users.update' : 'users.store';
        const routeParams = user ? { id: user.id } : {};
        router.post(route(routeName, routeParams), formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => toastr.success(user ? 'User updated successfully' : 'user created successfully'),
            onError: (errorResponse) => {
                if (errorResponse.errors) {
                    setErrors(errorResponse.errors);
                }
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="new">
                <GoBackButton href={'/grant_types'} />
                <div className="newContainer mt-1">
                    <Card style={{ maxWidth: '800px', margin: 'auto' }}>
                        <CardHeader
                            title={user ? 'Update user' : 'Create user'}
                            titleTypographyProps={{ variant: 'subtitle1' }}
                            style={{ textAlign: 'center', backgroundColor: '#f5f5f5', padding: '8px' }}
                        />
                        <CardContent>
                            <form onSubmit={handleSubmit} >
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Name in Nepali"
                                            name="name_np"
                                            value={nameNp}
                                            onChange={(e) => setNameNp(e.target.value)}
                                            error={!!errors.name_np}
                                            helperText={errors.name_np}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Mobile Number"
                                            name="mobile_number"
                                            value={mobile_number}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            error={!!errors.mobile_number}
                                            helperText={errors.mobile_number}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={status}
                                                    onChange={(e) => setStatus(e.target.checked)}
                                                    name="status"
                                                    color="primary"
                                                />
                                            }
                                            label="Status"
                                        />
                                    </Grid>


                                </Grid>

                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                                    {user ? 'UPDATE' : 'SUBMIT'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default UserForm;
