import { useState } from 'react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import toastr from 'toastr';
import GoBackButton from '@/Components/Mui/GoBackButton';
import { Card, Grid, CardContent, CardHeader, TextField, Select, MenuItem, FormControl, InputLabel, Button, FormHelperText } from '@mui/material';

const ReligionsForm = (props) => {
    const { auth, religion } = props;
    const [name, setName] = useState(religion ? religion.name : '');
    const [nameNp, setNameNp] = useState(religion ? religion.name_np : '');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? '' : 'Name is required';
        tempErrors.name_np = nameNp ? '' : 'Name In nepali is required';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append('_method', religion ? 'PUT' : 'POST');
        formData.append('name', name);
        formData.append('name_np', nameNp);

        const routeName = religion ? 'religions.update' : 'religions.store';
        const routeParams = religion ? { id: religion.id } : {};
        router.post(route(routeName, routeParams), formData, {
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => toastr.success(religion ? 'religion updated successfully' : 'religion created successfully'),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="new">
                <GoBackButton href={'/religions'} />
                <div className="newContainer mt-1">
                    <Card style={{ maxWidth: '800px', margin: 'auto' }}>
                        <CardHeader
                            title={religion ? 'Update religion' : 'Create religion'}
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

                                    {/* <Grid item xs={4}>
                                        <FormControl fullWidth margin="normal" error={!!errors.status}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                name="status"
                                                size="small"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <MenuItem value="active">Active</MenuItem>
                                                <MenuItem value="inactive">Inactive</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.status}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth margin="normal" error={!!errors.category}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                name="category"
                                                size="small"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <MenuItem value="tech">Tech</MenuItem>
                                                <MenuItem value="health">Health</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.category}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth margin="normal" error={!!errors.subcategory}>
                                            <InputLabel>Subcategory</InputLabel>
                                            <Select
                                                name="subcategory"
                                                size="small"
                                                value={subcategory}
                                                onChange={(e) => setSubcategory(e.target.value)}
                                            >
                                                <MenuItem value="frontend">Frontend</MenuItem>
                                                <MenuItem value="backend">Backend</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.subcategory}</FormHelperText>
                                        </FormControl>
                                    </Grid> */}
                                </Grid>

                                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                                    {religion ? 'UPDATE' : 'SUBMIT'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default ReligionsForm;
