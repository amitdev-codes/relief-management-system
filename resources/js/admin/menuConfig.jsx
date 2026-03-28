import React from "react";
import {
    DashboardOutlined as DashboardOutlinedIcon,
    PeopleOutlined as PeopleOutlinedIcon,
    CleanHandsOutlined as CleanHandsOutlinedIcon,
    AddShoppingCartOutlined as AddShoppingCartOutlinedIcon,
    AccountBalanceOutlined as AccountBalanceOutlinedIcon,
    AodOutlined as AodOutlinedIcon,
    AssignmentReturnOutlined as AssignmentReturnOutlinedIcon,
    AssignmentOutlined as AssignmentOutlinedIcon,
    LocalShippingOutlined as LocalShippingOutlinedIcon,
    HelpOutline as HelpOutlinedIcon,
    LocalAtmOutlined as LocalAtmOutlinedIcon,
    ReceiptOutlined as ReceiptOutlinedIcon,
    TextFieldsOutlined as TextFieldsOutlinedIcon
} from "@mui/icons-material";
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TempleHinduOutlinedIcon from '@mui/icons-material/TempleHinduOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import BabyChangingStationOutlinedIcon from '@mui/icons-material/BabyChangingStationOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';

const menuConfig = [
    {
        label: "Dashboard",
        icon: <DashboardOutlinedIcon sx={{ color: 'blue' }} />,
        href: route("adminDashboard"),
        permission: "view-dashboard",
    },
    {
        label: "Applicant Management",
        icon: <PeopleOutlinedIcon sx={{ color: 'green' }} />,
        href: route("applicant-profiles.index"),
        permission: "view-applicant-profiles",
    },
    {
        label: "Relief Management",
        icon: <CleanHandsOutlinedIcon sx={{ color: 'orange' }} />,
        href: route("relief-fund-allocations.index"),
        permission: "view-relief-fund-allocations",
    },
    {
        label: "Grant Management",
        icon: <AddShoppingCartOutlinedIcon sx={{ color: 'purple' }} />,
        href: route("grant-allocations.index"),
        permission: "view-grant-allocations",
    },
    {
        label: "Loan Management",
        icon: <AccountBalanceOutlinedIcon sx={{ color: 'brown' }} />,
        href: "loan",
        permission: "view-loan-details",
        submenu: [
            {
                label: "ऋण आवेदन",
                icon: <AodOutlinedIcon sx={{ color: 'brown' }} />,
                href: route("loan-allocations.index"),
                permission: "view-loan-allocations",
            },
            {
                label: "ऋण फिर्ता फार्म",
                icon: <AssignmentReturnOutlinedIcon sx={{ color: 'purple' }} />,
                href: route("loan-clearances.index"),
                permission: "view-loan-clearances",
            },
            {
                label: "उद्धेस्यगत ऋणको प्रतिबेदन",
                icon: <ReceiptLongOutlinedIcon sx={{ color: 'teal' }} />,
                href: route("loanPurposeReport"),
                permission: "view loan reports",
            },
            {
                label: "ऋणको सेटिंगसहरु",
                icon: <EngineeringIcon sx={{ color: 'red' }} />,
                href: route("loan-settings.index"),
                permission: "view-loan-settings",
            },

        ],
    },
    {
        label: "Master Menu",
        icon: <AssignmentOutlinedIcon sx={{ color: 'darkblue' }} />,
        href: "/relief_prioritizations",
        // permission: "view master menu",
        submenu: [
            {
                label: "राहत विवरण",
                icon: <LocalShippingOutlinedIcon sx={{ color: 'teal' }} />,
                href: route("admin.relief-prioritizations.index"),
                permission: "view-relief-prioritizations",
            },
            {
                label: "राहत प्रकार",
                icon: <HelpOutlinedIcon sx={{ color: 'magenta' }} />,
                href: route("relief-types.index"),
                permission: "view-relief-types",
            },
            {
                label: "सहयोगको किसिम",
                icon: <PeopleOutlinedIcon sx={{ color: 'gray' }} />,
                href: route("help-types.index"),
                permission: "view-help-types",
            },
            {
                label: "जात",
                icon: <DashboardOutlinedIcon sx={{ color: 'darkred' }} />,
                href: route("castes.index"),
                permission: "view-castes",
            },
            {
                label: "भाषा",
                icon: <LocalAtmOutlinedIcon sx={{ color: 'darkgreen' }} />,
                href: route("adminDashboard"),
                permission: "view-languages",
            },
            {
                label: "धर्म",
                icon: <TempleHinduOutlinedIcon sx={{ color: 'orange' }} />,
                href: route("religions.index"),
                permission: "view-religions",
            },
            {
                label: "राहत प्याकेजहरु",
                icon: <LocalGroceryStoreOutlinedIcon sx={{ color: 'brown' }} />,
                href: route("relief-packages.index"),
                permission: "view-relief-packages",
            },
            {
                label: "अनुदानको प्रकार",
                icon: <BabyChangingStationOutlinedIcon sx={{ color: 'purple' }} />,
                href: route("grant-types.index"),
                permission: "view-grant-types",
            },
        ],
    },

    {
        label: "User Management",
        icon: <AccountBalanceOutlinedIcon sx={{ color: '#8d6e63', marginRight: 1 }} />,
        href: "loan",
        submenu: [
            {
                label: "Users",
                icon: <PeopleOutlinedIcon sx={{ color: '#8d6e63', marginRight: 1 }} />,
                href: route("admin.users.index"),
                permission: "view-users",
            },
            {
                label: "Roles",
                icon: <DashboardOutlinedIcon sx={{ color: '#673ab7', marginRight: 1 }} />,
                href: route("admin.roles.index"),
                permission: "view-roles",
            },
            {
                label: "Permissions",
                icon: <ReceiptLongOutlinedIcon sx={{ color: 'purple', marginRight: 1 }} />,
                href: route("admin.permissions.index"),
                permission: "view-permissions",
            },
        ],
    },

];

export default menuConfig;
