import React from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';

const ReliefEntriesTable = ({
    reliefEntries,
    relief_types,
    mst_relief_sub_categories,
    mst_length_units,
    handleGridChange,
    addReliefEntry,
    removeReliefEntry
}) => {
    return (
        <>
            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={addReliefEntry}
                >
                    Add Relief Entry
                </Button>
            </Grid>
            {reliefEntries.map((entry, index) => (
                <Grid container spacing={2} key={index} ml={10}>
                    <Grid item xs={12} sm={3} mt={2}>
                        <TextField
                            select
                            size="small"
                            required
                            fullWidth
                            label="राहत प्रकार"
                            value={entry.relief_type_id}
                            onChange={(e) => handleGridChange(index, 'relief_type_id', e.target.value)}
                        >
                            {relief_types.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}--{option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} mt={2}>
                        <TextField
                            select
                            size="small"
                            required
                            fullWidth
                            label="राहत उपप्रकार"
                            value={entry.relief_sub_category_id}
                            onChange={(e) => handleGridChange(index, 'relief_sub_category_id', e.target.value)}
                        >
                            {(mst_relief_sub_categories[entry.relief_type_id] || []).map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {entry.relief_type_id === 1 ? option.amount : `${option.name}--${option.name_np}`}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2} mt={2}>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            label="परिमाण"
                            value={entry.quantity}
                            onChange={(e) => handleGridChange(index, 'quantity', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} mt={2}>
                        <TextField
                            size="small"
                            required
                            fullWidth
                            label="Length Unit"
                            value={entry.length_unit_id ? (mst_length_units[entry.length_unit_id] || '').name_np : ''}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} mt={2}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeReliefEntry(index)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default ReliefEntriesTable;
