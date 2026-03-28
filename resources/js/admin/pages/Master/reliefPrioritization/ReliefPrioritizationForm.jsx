import { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import toastr from 'toastr';
import GoBackButton from '@/Components/Mui/GoBackButton';
import { Card, Grid, CardContent, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormHelperText, FormControlLabel, Switch } from '@mui/material';

const ReliefPrioritizationForm = (props) => {
    const { auth, reliefPrioritization, errors: serverErrors } = props;
    const [name, setName] = useState(reliefPrioritization ? reliefPrioritization.name : '');
    const [nameNp, setNameNp] = useState(reliefPrioritization ? reliefPrioritization.name_np : '');
    const [description, setDescription] = useState(reliefPrioritization ? reliefPrioritization.description : '');
    const [status, setStatus] = useState(reliefPrioritization ? reliefPrioritization.status : false);
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
        formData.append('_method', reliefPrioritization ? 'PUT' : 'POST');
        formData.append('name', name);
        formData.append('name_np', nameNp);
        formData.append('description', description);
        formData.append('status', status ? '1' : '0');

        const routeName = reliefPrioritization ? 'relief_prioritizations.update' : 'relief_prioritizations.store';
        const routeParams = reliefPrioritization ? { id: reliefPrioritization.id } : {};
        router.post(route(routeName, routeParams), formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => toastr.success(reliefPrioritization ? 'Relief Prioritization updated successfully' : 'reliefPrioritization created successfully'),
            onError: (errorResponse) => {
                // Update the errors state with server-side validation errors
                if (errorResponse.errors) {
                    setErrors(errorResponse.errors);
                }
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="new">
                <GoBackButton href={'/relief_prioritizations'} />
                <div className="newContainer mt-1">
                    <Card style={{ maxWidth: '800px', margin: 'auto' }} sx={{ fontFamily: "Kalimati" }}>
                        <CardHeader
                            sx={{ fontFamily: "Kalimati" }}
                            title={reliefPrioritization ? 'राहत वितरणको लागि प्राथमिकता अध्यावधि गर्नुहोस' : 'राहत वितरणको लागि प्राथमिकता थप्नुहोस्'}
                            titleTypographyProps={{ variant: 'subtitle1', fontFamily: "Kalimati" }}
                            style={{ textAlign: 'center', fontFamily: "Kalimati", backgroundColor: '#f5f5f5', padding: '8px' }}
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
                                    {reliefPrioritization ? 'UPDATE' : 'SUBMIT'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ReliefPrioritizationForm;
