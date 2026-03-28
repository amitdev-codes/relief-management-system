import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Box,
    Typography,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from '@mui/material';

const PermissionGroup = ({ permissions, modelValue, onChange}) => {
    const [selectedPermissions, setSelectedPermissions] = useState(modelValue || []);
    // Modified to handle multi-word resources
    const resources = [...new Set(permissions.map(p => {
        const parts = p.name.split('-');
        return parts.slice(1).join('-')
            .toLowerCase();
    }))];



    const toggleSelectAll = (checked) => {
        const allPermissions = resources.flatMap(resource =>
            ['view', 'create', 'edit', 'delete'].map(action =>
                `${action}-${resource}`)
        );
        setSelectedPermissions(checked ? allPermissions : []);
        onChange(checked ? allPermissions : []);
    };

    const toggleColumnSelect = (action, checked) => {
        const columnPerms = resources.map(resource => `${action}-${resource}`);
        const newPerms = checked
            ? [...new Set([...selectedPermissions, ...columnPerms])]
            : selectedPermissions.filter(p => !columnPerms.includes(p));

        setSelectedPermissions(newPerms);
        onChange(newPerms);
    };

    const togglePermission = (action, resource, checked) => {
        const permission = `${action}-${resource}`;
        const newPerms = checked
            ? [...selectedPermissions, permission]
            : selectedPermissions.filter(p => p !== permission);

        setSelectedPermissions(newPerms);
        onChange(newPerms);
    };

    const isAllSelected = useMemo(() => {
        const allPossible = resources.length * 4;
        return selectedPermissions.length === allPossible;
    }, [selectedPermissions, resources]);

    const isColumnSelected = useCallback((action) => {
        return resources.every(resource =>
            selectedPermissions.includes(`${action}-${resource}`)
        );
    }, [selectedPermissions, resources]);

    // Function to format resource name for display
    const formatResourceName = (resource) => {
        return resource
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        if (modelValue) {
            setSelectedPermissions(modelValue);
        }
    }, [modelValue]);

    return (
        <Box>
            <TableContainer sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                mb: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    p: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">Select All</Typography>
                        <Checkbox
                            size="small"
                            checked={isAllSelected}
                            onChange={(e) => toggleSelectAll(e.target.checked)}
                        />
                    </Box>
                </Box>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'medium' }}>Resource</TableCell>
                            {['View', 'Create', 'Edit', 'Delete'].map(action => (
                                <TableCell key={action} align="center" sx={{ fontWeight: 'medium' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="body2">{action}</Typography>
                                        <Checkbox
                                            size="small"
                                            checked={isColumnSelected(action.toLowerCase())}
                                            onChange={(e) => toggleColumnSelect(action.toLowerCase(), e.target.checked)}
                                        />
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources.map(resource => (
                            <TableRow key={resource} hover>
                                <TableCell>
                                    {formatResourceName(resource)}
                                </TableCell>
                                {['view', 'create', 'edit', 'delete'].map(action => (
                                    <TableCell key={action} align="center">
                                        <Checkbox
                                            size="small"
                                            checked={selectedPermissions.includes(`${action}-${resource}`)}
                                            onChange={(e) => togglePermission(action, resource, e.target.checked)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PermissionGroup;
