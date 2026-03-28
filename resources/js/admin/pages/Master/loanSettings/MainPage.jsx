import React, { useState, lazy, Suspense } from 'react';
import { usePage } from '@inertiajs/react';
import { Tabs, Tab, Box, CircularProgress, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedLayout from '@/Components/Layouts/AuthenticatedLayout';
import { Home, SchoolOutlined, Assignment, Description } from '@mui/icons-material';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import LoanSetting from '@/admin/Components/loan/master/LoanSetting';
import EducationalLoanFacultySetting from '@/admin/Components/loan/master/EducationalLoanFacultySetting';
import LoanPurposeTypeSetting from '@/admin/Components/loan/master/LoanPurposeTypeSetting';
import LoanTypeSetting from '@/admin/Components/loan/master/LoanTypeSetting';
import '@/admin/Components/dataTable/dataTable.scss'



const MainPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { tabsData } = usePage().props;
    const theme = useTheme();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };


    const tabComponents = [
        LoanSetting,
        EducationalLoanFacultySetting,
        LoanPurposeTypeSetting,
        LoanTypeSetting
    ];

    const tabNames = ['ऋणको सेटिंग', 'शैक्षिक संकाय ऋणको प्रकार', 'ऋण उद्धेस्यको प्रकार', 'ऋण विवरणको प्रकार'];
    const baseUrls = [
        '/loan_settings',
        '/educational_loan_faculties',
        '/loan_purpose_types',
        '/loan_types'
    ];
    const tabIcons = [<Home color='purple' />, <SchoolOutlined sx={{ color: 'red', marginRight: 1 }} />, <AccountBalanceOutlinedIcon sx={{ color: 'green', marginRight: 1 }} />, <AccountBalanceOutlinedIcon sx={{ color: 'blue', marginRight: 1 }} />];


    return (
        <AuthenticatedLayout>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="dynamic tabs"
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                    sx={{ fontSize: theme.typography.tab.fontSize }}
                >
                    {tabNames.map((name, index) => (
                        <Tab key={index} label={name} icon={tabIcons[index]} iconPosition="start" />
                    ))}
                </Tabs>
                <Suspense fallback={<CircularProgress />}>
                    {tabComponents.map((TabComponent, index) => (
                        <TabPanel key={index} value={activeTab} index={index}>
                            <TabComponent data={tabsData[Object.keys(tabsData)[index]]} baseUrl={baseUrls[index]} />
                        </TabPanel>
                    ))}
                </Suspense>
                <ToastContainer />
            </Box>
        </AuthenticatedLayout>
    );
};

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && children}
    </div>
);

export default MainPage;
