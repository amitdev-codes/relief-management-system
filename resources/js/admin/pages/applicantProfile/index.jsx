import React from 'react';
import { applicant_profiles_Columns } from "@/forms/application_form";
import DataTable from '@/admin/Components/dataTable/DataTable';
import { Box, Grid } from '@mui/material';
import { useIsMobile } from '@/hooks/responsive/useIsMobile';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';


const ApplicantProfiles = ({ applicant_profiles }) => {
    const isMobile = useIsMobile();

    return (
        <AuthenticatedLayout>
            <Box sx={{ width: '100%', fontFamily: 'Kalimati' }}>
                <DataTable
                    userRows={applicant_profiles}
                    userColumns={applicant_profiles_Columns.map(column => ({
                        ...column,
                    }))}
                    title="लाभग्राहीहरूको विवरण"
                    route="applicantProfiles"
                    hasPrint={false}
                    create={true}
                />
            </Box>
        </AuthenticatedLayout>
    );
};

export default ApplicantProfiles;
