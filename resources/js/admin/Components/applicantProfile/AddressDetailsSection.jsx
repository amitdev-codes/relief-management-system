import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Box, Card, Alert, CardContent, CardHeader, Grid, TextField, MenuItem, Autocomplete, Button, Typography, Stack, IconButton, InputAdornment, InputLabel } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchableDropdown from '@/Components/Mui/SearchableDropdown';

const AddressDetailsSection = ({
    formState,
    applicantProfile = {},
    handleChange,
    handleDateChange,
    provinces,
    errors,
    staticData // Add this prop
}) => {
    const [new_province, setNewProvince] = useState(staticData?.district?.province?.province_id || '');
    const [new_district, setNewDistrict] = useState(staticData.district.district_id || '');
    const [localLevels, setLocalLevels] = useState([]);
    const [districts, setDistricts] = useState([]);



    useEffect(() => {
        if (staticData && staticData.district && staticData.district.province) {
            handleChange({ target: { name: 'new_province', value: new_province } });
        }
        const fetchDistricts = async () => {
            if (new_province) {
                try {
                    const response = await axios.get(`/api/districts/${new_province}`);
                    setDistricts(response.data);
                    handleChange({ target: { name: 'new_district', value: response.data[0]?.id || '' } }); // Set new district to first one
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };

        const fetchLocalLevels = async () => {
            if (new_province && new_district) {
                try {
                    const response = await axios.get(`/api/local-levels/${new_province}/${new_district}`);
                    setLocalLevels(response.data);
                    handleChange({ target: { name: 'new_local_level', value: response.data[0]?.id || '' } }); // Set local level to first one
                } catch (error) {
                    console.error('Error fetching local levels:', error);
                }
            }
        };

        fetchDistricts();
        fetchLocalLevels();
    }, [new_province, new_district]);

    const handleCopyAddress = () => {
        handleChange({ target: { name: 'old_province', value: new_province } });
        handleChange({ target: { name: 'old_district', value: new_district } });
        handleChange({ target: { name: 'old_local_level', value: formState.new_local_level } });
        handleChange({ target: { name: 'old_ward', value: formState.new_ward } });
        handleChange({ target: { name: 'old_street_name', value: formState.new_street_name } });
    };

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary" sx={{ ml: 2 }} endIcon={<ContactMailIcon />}>
                    हालको ठेगाना
                </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={provinces}
                    value={new_province}
                    onChange={setNewProvince}
                    label="प्रदेस/Province"
                    error={!!errors.new_province}
                    errorMessage={errors.new_province}
                    targetName="new_province"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={districts}
                    value={new_district}
                    onChange={setNewDistrict}
                    label="जिल्ला"
                    error={!!errors.new_district}
                    errorMessage={errors.new_district}
                    targetName="new_district"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={localLevels}
                    value={formState.new_local_level}
                    onChange={handleChange}
                    label="Local Level"
                    error={!!errors.new_local_level}
                    errorMessage={errors.new_local_level}
                    targetName="new_local_level"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    required
                    name="new_ward"
                    label="वडा/Ward"
                    size="small"
                    type="number"
                    value={formState.new_ward}
                    onChange={handleChange}
                    error={!!errors.new_ward}
                    helperText={errors.new_ward}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    required
                    name="new_street_name"
                    label="टोल/Tole Name"
                    size="small"
                    value={formState.new_street_name}
                    onChange={handleChange}
                    error={!!errors.new_street_name}
                    helperText={errors.new_street_name}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={handleCopyAddress} sx={{ ml: 2 }} endIcon={<ContentCopyIcon />}>
                    ठेगाना अनुकरण  गर्नुहोस
                </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary" sx={{ ml: 2 }} endIcon={<ContactMailIcon />}>
                    साविक ठेगाना
                </Button>
            </Grid>
            {/* Old Address Fields */}
            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={provinces}
                    value={formState.old_province}
                    onChange={handleChange}
                    label="प्रदेस/Province"
                    error={!!errors.old_province}
                    errorMessage={errors.old_province}
                    targetName="old_province"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={districts}
                    value={formState.old_district}
                    onChange={handleChange}
                    label="जिल्ला"
                    error={!!errors.old_district}
                    errorMessage={errors.old_district}
                    targetName="old_district"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={localLevels}
                    value={formState.old_local_level}
                    onChange={handleChange}
                    label="Local Level"
                    error={!!errors.old_local_level}
                    errorMessage={errors.old_local_level}
                    targetName="old_local_level"
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    required
                    name="old_ward"
                    label="वडा/Ward"
                    type="number"
                    size="small"
                    value={formState.old_ward}
                    onChange={handleChange}
                    error={!!errors.old_ward}
                    helperText={errors.old_ward}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    required
                    name="old_street_name"
                    label="टोल/Tole Name"
                    size="small"
                    value={formState.old_street_name}
                    onChange={handleChange}
                    error={!!errors.old_street_name}
                    helperText={errors.old_street_name}

                />
            </Grid>
        </>
    );
};

export default AddressDetailsSection;
