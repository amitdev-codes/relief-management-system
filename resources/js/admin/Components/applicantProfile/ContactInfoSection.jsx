import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import NepaliDatePickerWithDefault from '@/Components/Mui/NepaliDatePickerWithDefault';
import SearchableDropdown from '@/Components/Mui/SearchableDropdown';


const ContactInfoSection = ({
    formState,
    citizenshipDistricts,
    staticData,
    handleChange,
    handleDateChange,
    errors
}) => {

    const [citizenship_issued_district, setCitizenshipIssuedDistrict] = useState(staticData.district.district_id || '');
    useEffect(() => {
        if (staticData && staticData.district) {
            handleChange({ target: { name: 'citizenship_issued_district', value: citizenship_issued_district } });
        }
    }, [])

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" color="success" sx={{ ml: 2 }} endIcon={<ContactMailIcon />}>
                    नागरिकता बिबरण
                </Button>
            </Grid>

            <Grid item xs={12} sm={4} >
                <TextField
                    size="small"
                    fullWidth
                    label="नागरिकता नं "
                    name="citizenship_no"
                    required
                    value={formState.citizenship_no}
                    onChange={handleChange}
                    error={!!errors.citizenship_no}
                    helperText={errors.citizenship_no}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': {
                                color: 'red',
                            },
                        },
                    }}
                >
                </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
                <SearchableDropdown
                    options={citizenshipDistricts}
                    value={citizenship_issued_district}
                    onChange={citizenship_issued_district}
                    label="जिल्ला"
                    error={!!errors.citizenship_issued_district}
                    errorMessage={errors.citizenship_issued_district}
                    targetName="citizenship_issued_district"
                />
            </Grid>


            <Grid item xs={12} sm={3} ml={2} >
                <NepaliDatePickerWithDefault
                    formName="नागरिकता जारी मिति"
                    fieldName="citizenship_issued_date_bs"
                    value={formState.citizenship_issued_date_bs}
                    handleDateChange={handleDateChange}
                    error={errors.citizenship_issued_date_bs}
                    InputLabelProps={{
                        sx: {
                            '& .MuiFormLabel-asterisk': { color: 'red' },
                        },
                    }}
                />
            </Grid>
        </>
    );
};

export default ContactInfoSection;
