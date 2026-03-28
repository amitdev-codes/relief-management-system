import { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import toastr from 'toastr';
import GoBackButton from '@/Components/Mui/GoBackButton';
import { Card, Grid, CardContent, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormHelperText, FormControlLabel, Switch } from '@mui/material';

const GrantTypesForm = (props) => {
    const { auth, grantType, errors: serverErrors } = props;
    const [name, setName] = useState(grantType ? grantType.name : '');
    const [nameNp, setNameNp] = useState(grantType ? grantType.name_np : '');
    const [description, setDescription] = useState(grantType ? grantType.description : '');
    const [status, setStatus] = useState(grantType ? grantType.status : false);
    const [errors, setErrors] = useState(serverErrors || {});

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? '' : 'Name is required';
        tempErrors.name_np = nameNp ? '' : 'Name In nepali is required';
        tempErrors.description = description ? '' : 'Description is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('_method', grantType ? 'PUT' : 'POST');
        formData.append('name', name);
        formData.append('name_np', nameNp);
        formData.append('description', description);
        formData.append('status', status ? '1' : '0');

        const routeName = grantType ? 'grant_types.update' : 'grant_types.store';
        const routeParams = grantType ? { id: grantType.id } : {};
        router.post(route(routeName, routeParams), formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => toastr.success(grantType ? 'Relief Prioritization updated successfully' : 'grantType created successfully'),
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
                            title={grantType ? 'Update grantType' : 'Create grantType'}
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
                                            label="Description"
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            margin="normal"
                                            multiline
                                            rows={4}
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
                                    {grantType ? 'UPDATE' : 'SUBMIT'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default GrantTypesForm;
