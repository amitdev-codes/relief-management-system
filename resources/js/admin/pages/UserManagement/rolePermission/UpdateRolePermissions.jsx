import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import {
    Grid, FormControlLabel, Switch, Checkbox, Button, Card,
    CardContent, CardHeader, TextField, Box, Typography
} from '@mui/material';

const UpdateRolePermissions = ({ auth, role, permissions = [], roleName }) => {
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        role_name: roleName,
        is_superadmin: false,
        permissions: [],
    });

    useEffect(() => {
        if (role) {
            setIsSuperAdmin(role.is_superadmin || false);
            const rolePermissions = role.permissions.map(p => p.name);
            setData(prevData => ({
                ...prevData,
                is_superadmin: role.is_superadmin || false,
                permissions: rolePermissions,
            }));
            updatePermissions(role.is_superadmin, rolePermissions);
        }
    }, [role]);

    const updatePermissions = (isSuperAdmin, assignedPermissions = []) => {
        const allPermissions = permissions.map(p => p.name);
        const permissionState = Object.fromEntries(
            allPermissions.map(p => [p, isSuperAdmin || assignedPermissions.includes(p)])
        );
        setSelectedPermissions(permissionState);
        setSelectAll(isSuperAdmin);
    };

    const handlePermissionChange = (permissionName) => {
        const updatedPermissions = {
            ...selectedPermissions,
            [permissionName]: !selectedPermissions[permissionName],
        };
        setSelectedPermissions(updatedPermissions);
        setData('permissions', Object.keys(updatedPermissions).filter(k => updatedPermissions[k]));
    };

    const handleSuperAdminChange = (event) => {
        const isChecked = event.target.checked;
        setIsSuperAdmin(isChecked);
        setData('is_superadmin', isChecked);
        updatePermissions(isChecked);
    };

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        const updatedPermissions = {};
        permissions.forEach(permission => {
            const permissionName = permission.name;
            updatedPermissions[permissionName] = isChecked;
        });
        setSelectedPermissions(updatedPermissions);
        setData('permissions', isChecked ? Object.keys(updatedPermissions) : []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id));
    };

    const extractModuleName = (permissionName) => {
        return permissionName.split(' ').slice(1).join(' ');
    };

    const uniqueModules = [...new Set(permissions.map(p => extractModuleName(p.name)))];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Update Role Permissions" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader title="Role Permissions" className="bg-gray-50 p-4 text-center" />
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Role Name"
                                            value={data.role_name}
                                            onChange={(e) => setData('role_name', e.target.value)}
                                            disabled={isSuperAdmin}
                                            error={!!errors.role_name}
                                            helperText={errors.role_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={data.is_superadmin}
                                                    onChange={handleSuperAdminChange}
                                                />
                                            }
                                            label="Super Admin"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    disabled={isSuperAdmin}
                                                />
                                            }
                                            label="Select All Permissions"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            display="grid"
                                            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                                            gap={2}
                                            p={2}
                                            bgcolor="#f5f5f5"
                                            borderRadius={1}
                                        >
                                            {permissions.map((permission) => (
                                                <Box key={permission.name} display="flex" alignItems="center">
                                                    <Checkbox
                                                        checked={selectedPermissions[permission.name] || false}
                                                        onChange={() => handlePermissionChange(permission.name)}
                                                        disabled={isSuperAdmin}
                                                    />
                                                    <Typography variant="body2">{permission.name}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={processing}
                                    className="mt-4 mx-auto block"
                                >
                                    Update Permissions
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default UpdateRolePermissions;
