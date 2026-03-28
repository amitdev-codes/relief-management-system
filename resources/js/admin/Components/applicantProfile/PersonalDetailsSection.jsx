import { Box, Card, Alert, CardContent, CardHeader, Grid, TextField, MenuItem, Button, Typography, Stack, IconButton, InputAdornment, InputLabel } from '@mui/material';
import PhotoUploadSection from '../PhotoUploadSection';
import NepaliDatePickerWithDefault from '@/Components/Mui/NepaliDatePickerWithDefault';

const PersonalDetailsSection = ({
    formState,
    applicantProfile,
    handleChange,
    handleDateChange,
    handlePhotoChange,
    handleRemovePhoto,
    religions,
    mothertongues,
    countries,
    genders,
    errors,
}) => {



    return (
        <Grid container spacing={3}>
            {/* Left Section: Form Fields */}
            <Grid item xs={12} sm={9}>
                <Grid container spacing={3}>
                    {/* English Name Fields */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} ml={2} mt={2}>
                                <TextField
                                    fullWidth
                                    required
                                    label="First Name"
                                    name="first_name"
                                    size="small"
                                    value={formState.first_name}
                                    onChange={handleChange}
                                    error={!!errors.first_name}
                                    helperText={errors?.first_name}
                                    InputLabelProps={{
                                        sx: {
                                            '& .MuiFormLabel-asterisk': { color: 'red' },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} ml={2} mt={2}>
                                <TextField
                                    fullWidth
                                    label="Middle Name"
                                    name="middle_name"
                                    size="small"
                                    value={formState.middle_name}
                                    onChange={handleChange}
                                    error={!!errors.middle_name}
                                    helperText={errors.middle_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} ml={2} mt={2}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Last Name"
                                    name="last_name"
                                    size="small"
                                    value={formState.last_name}
                                    onChange={handleChange}
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
                                    InputLabelProps={{
                                        sx: {
                                            '& .MuiFormLabel-asterisk': { color: 'red' },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Nepali Name Fields */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} ml={2} >
                                <TextField
                                    fullWidth
                                    required
                                    label="नाम"
                                    name="first_name_np"
                                    size="small"
                                    value={formState.first_name_np}
                                    onChange={handleChange}
                                    error={!!errors.first_name_np}
                                    helperText={errors.first_name_np}
                                    InputLabelProps={{
                                        sx: {
                                            '& .MuiFormLabel-asterisk': { color: 'red' },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} ml={2} >
                                <TextField
                                    fullWidth
                                    label="बीचको नाम"
                                    name="middle_name_np"
                                    size="small"
                                    value={formState.middle_name_np}
                                    onChange={handleChange}
                                    error={!!errors.middle_name_np}
                                    helperText={errors.middle_name_np}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} ml={2} >
                                <TextField
                                    fullWidth
                                    required
                                    label="थर"
                                    name="last_name_np"
                                    size="small"
                                    value={formState.last_name_np}
                                    onChange={handleChange}
                                    error={!!errors.last_name_np}
                                    helperText={errors.last_name_np}
                                    InputLabelProps={{
                                        sx: {
                                            '& .MuiFormLabel-asterisk': { color: 'red' },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Additional Fields */}
                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            select
                            size="small"
                            fullWidth
                            label="मातृभाषा/Mothertongue"
                            name="mothertongue_id"
                            value={formState.mothertongue_id}
                            onChange={handleChange}
                            error={!!errors.mothertongue_id}
                            helperText={errors.mothertongue_id}
                        >
                            {mothertongues.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name} - {option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            select
                            size="small"
                            fullWidth
                            label="देश/Country"
                            name="country_id"
                            value={formState.country_id || '11'}
                            onChange={handleChange}
                            error={!!errors.country_id}
                            helperText={errors.country_id}
                        >
                            {countries.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}- {option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            select
                            size="small"
                            fullWidth
                            label="Gender/लिंग"
                            name="gender_id"
                            value={formState.gender_id || '1'}
                            onChange={handleChange}
                            error={!!errors.gender_id}
                            helperText={errors.gender_id}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}- {option.name_np}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2} >
                        <NepaliDatePickerWithDefault
                            formName="जन्म मिति (DOB)"
                            fieldName="dob"
                            value={formState.dob}
                            handleDateChange={handleDateChange}
                            error={errors.dob}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            size="small"
                            fullWidth
                            name="phone"
                            label="फोन"
                            type="tel"
                            id="phone"
                            autoComplete="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                                startAdornment: (
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        +977
                                    </Typography>
                                ),
                            }}
                            inputProps={{
                                maxLength: 10,
                                pattern: "[0-9]{10}",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            fullWidth
                            id="email"
                            size="small"
                            label="इमेल"
                            name="email"
                            required
                            autoComplete="email"
                            value={formState.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2} >
                        <TextField
                            required
                            size="small"
                            fullWidth
                            name="mobile_number"
                            label="मोबाईल  नं"
                            type="tel"
                            id="mobile_number"
                            autoComplete="tel"
                            value={formState.mobile_number}
                            onChange={handleChange}
                            error={!!errors.mobile_number}
                            helperText={errors.mobile_number}
                            InputLabelProps={{
                                sx: {
                                    '& .MuiFormLabel-asterisk': { color: 'red' },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        +977
                                    </Typography>
                                ),
                            }}
                            inputProps={{
                                maxLength: 10,
                                pattern: "[0-9]{10}",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} ml={2}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="पारिवारिक संख्या"
                            name="family_count"
                            size="small"
                            value={formState.family_count}
                            onChange={handleChange}
                            error={!!errors.family_count}
                            helperText={errors.family_count}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={3} mt={5}>
                <PhotoUploadSection
                    fileName="फोटो अपलोड"
                    photo={formState.photo}
                    handlePhotoChange={handlePhotoChange}
                    handleRemovePhoto={handleRemovePhoto}
                    errors={{ photo: '' }}
                />
            </Grid>
        </Grid>

    );
};

export default PersonalDetailsSection;
