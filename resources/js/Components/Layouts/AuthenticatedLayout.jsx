import React, {
    useState,
    useMemo,
    useCallback,
    useContext,
    useEffect,
} from "react";
import { Drawer, Divider } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import {
    Container,
    Box,
    CircularProgress,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popper,
    Paper,
    Grow,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { router, usePage } from "@inertiajs/react";
import usePermissions from "../../hooks/userManagement/usePermissions";
import { Menu as MenuIcon } from "@mui/icons-material";
import MenuConfig from "../../admin/menuConfig";
import Header from "./Header";
import Footer from "./Footer";
import AuthenticatedFooter from "./AuthenticatedFooter";

const AuthenticatedLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { permissions, loading } = usePermissions();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [openMobileSubMenuIndex, setOpenMobileSubMenuIndex] = useState(null);
    const user = usePage().props.auth.user;

    const toggleSidebar = useCallback(
        () => setSidebarOpen((prev) => !prev),
        []
    );

    const filteredMenu = useMemo(() => {
        if (loading) return [];
        return MenuConfig.filter((item) => {
            if (item.permission && !permissions.includes(item.permission)) {
                return false;
            }
            if (item.submenu) {
                item.submenu = item.submenu.filter(
                    (subItem) =>
                        !subItem.permission ||
                        permissions.includes(subItem.permission)
                );
                return item.submenu.length > 0 || !item.permission;
            }
            return true;
        });
    }, [permissions, loading]);

    const currentRoute = router.page?.url || "";
    const isActiveRoute = (href) =>
        currentRoute.startsWith(new URL(href, window.location.origin).pathname);

    const handleMenuEnter = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuIndex(index);
    };

    const handleMenuLeave = () => {
        setOpenMenuIndex(null);
        setAnchorEl(null);
    };

    const handleMenuClick = (href, index) => {
        if (href) {
            router.visit(href);
        }
        setSidebarOpen(false);
        setOpenMobileSubMenuIndex(null);
        handleMenuLeave();
    };

    const handleMobileSubMenuToggle = (index) => {
        setOpenMobileSubMenuIndex(
            openMobileSubMenuIndex === index ? null : index
        ); // Toggle submenu for mobile
    };
    const handleBackClick = () => {
        // Get the previous URL from the Inertia history

        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to a default route
            router.visit(route("adminDashboard")); // Change to your default route
        }
    };

    const renderMenuItems = () =>
        filteredMenu.map((item, index) => (
            <div
                key={index}
                onMouseEnter={(e) => handleMenuEnter(e, index)}
                onMouseLeave={handleMenuLeave}
                style={{
                    display: "inline-block",
                    position: "relative",
                    width: isMobile ? "100%" : "auto",
                }}
            >
                <Chip
                    sx={{
                        fontFamily: "Kalimati",
                        margin: "4px",
                        fontSize: "1.0rem",
                        backgroundColor:
                            isActiveRoute(item.href) || openMenuIndex === index
                                ? theme.palette.primary.main
                                : theme.palette.background.default,
                        color:
                            isActiveRoute(item.href) || openMenuIndex === index
                                ? theme.palette.primary.contrastText
                                : theme.palette.text.primary,
                        cursor: "pointer",
                        size: "medium",
                        "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                        },
                    }}
                    label={item.label}
                    icon={item.icon}
                    onClick={() =>
                        item.submenu ? null : handleMenuClick(item.href)
                    }
                />
                {item.submenu && (
                    <Popper
                        open={openMenuIndex === index}
                        anchorEl={anchorEl}
                        transition
                        placement="bottom-start"
                    >
                        {({ TransitionProps }) => (
                            <Grow {...TransitionProps}>
                                <Paper
                                    sx={{
                                        bgcolor: theme.palette.background.paper,
                                    }}
                                >
                                    <List>
                                        {item.submenu.map(
                                            (subItem, subIndex) => (
                                                <ListItem
                                                    button
                                                    key={subIndex}
                                                    onClick={() =>
                                                        handleMenuClick(
                                                            subItem.href
                                                        )
                                                    }
                                                    sx={{
                                                        cursor: "pointer",
                                                        backgroundColor:
                                                            isActiveRoute(
                                                                subItem.href
                                                            )
                                                                ? theme.palette
                                                                      .action
                                                                      .hover
                                                                : undefined,
                                                        "&:hover": {
                                                            backgroundColor:
                                                                theme.palette
                                                                    .action
                                                                    .hover,
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        {subItem.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={subItem.label}
                                                        primaryTypographyProps={{
                                                            fontFamily:
                                                                "Kalimati",
                                                        }}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                )}
                {/* Render submenu for mobile */}
                {item.submenu && openMobileSubMenuIndex === index && (
                    <List sx={{ display: { xs: "block", md: "none" } }}>
                        {item.submenu.map((subItem, subIndex) => (
                            <ListItem
                                button
                                key={subIndex}
                                onClick={() => handleMenuClick(subItem.href)}
                                sx={{
                                    backgroundColor: isActiveRoute(subItem.href)
                                        ? theme.palette.action.hover
                                        : undefined,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <ListItemIcon>{subItem.icon}</ListItemIcon>
                                <ListItemText
                                    primary={subItem.label}
                                    primaryTypographyProps={{
                                        fontFamily: "Kalimati",
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        ));

    useEffect(() => {
        if (!user) {
            router.visit(route("login")); // Redirect to login if not authenticated
        }
    }, [user]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    pb: { xs: "56px", sm: "64px" },
                }}
            >
                {user && (
                    <>
                        {/* Fixed top bar containing back button and menu */}
                        <AppBar
                            position="fixed"
                            sx={{
                                top: 64,
                                bgcolor: theme.palette.background.default,
                                boxShadow: 1,
                                zIndex: theme.zIndex.appBar,
                            }}
                        >
                            <Toolbar
                                sx={{
                                    minHeight: { xs: "48px", md: "64px" },
                                    px: { xs: 1, md: 2 },
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Back Icon */}
                                <IconButton
                                    color="primary"
                                    onClick={handleBackClick}
                                    sx={{
                                        "& svg": {
                                            fontSize: "1.5rem",
                                        },
                                    }}
                                >
                                    <ArrowCircleLeftOutlinedIcon />
                                </IconButton>

                                {/* Mobile Menu Icon */}
                                <IconButton
                                    edge="start"
                                    aria-label="menu"
                                    color="error"
                                    onClick={toggleSidebar}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>

                                {/* Desktop Menu */}
                                <Box
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        flexGrow: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {renderMenuItems()}
                                </Box>
                            </Toolbar>
                        </AppBar>

                        {/* Drawer or conditional rendering for mobile menu */}
                        <Drawer
                            anchor="left"
                            open={sidebarOpen}
                            onClose={toggleSidebar}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiDrawer-paper": {
                                    backgroundColor:
                                        theme.palette.background.paper,
                                    color: theme.palette.text.primary,
                                },
                            }}
                        >
                            <Box sx={{ width: 250 }}>
                                <List>
                                    {filteredMenu.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem
                                                button
                                                onClick={() =>
                                                    item.submenu
                                                        ? handleMobileSubMenuToggle(
                                                              index
                                                          )
                                                        : handleMenuClick(
                                                              item.href
                                                          )
                                                }
                                                sx={{
                                                    backgroundColor:
                                                        isActiveRoute(item.href)
                                                            ? theme.palette
                                                                  .action.hover
                                                            : undefined,
                                                    "&:hover": {
                                                        backgroundColor:
                                                            theme.palette.action
                                                                .hover,
                                                    },
                                                }}
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.label}
                                                    primaryTypographyProps={{
                                                        fontFamily: "Kalimati",
                                                    }}
                                                />
                                            </ListItem>

                                            {/* Submenu for mobile */}
                                            {item.submenu &&
                                                openMobileSubMenuIndex ===
                                                    index && (
                                                    <List
                                                        sx={{
                                                            pl: 4,
                                                            bgcolor:
                                                                theme.palette
                                                                    .background
                                                                    .paper,
                                                        }}
                                                    >
                                                        {item.submenu.map(
                                                            (
                                                                subItem,
                                                                subIndex
                                                            ) => (
                                                                <ListItem
                                                                    button
                                                                    key={
                                                                        subIndex
                                                                    }
                                                                    onClick={() =>
                                                                        handleMenuClick(
                                                                            subItem.href
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        backgroundColor:
                                                                            isActiveRoute(
                                                                                subItem.href
                                                                            )
                                                                                ? theme
                                                                                      .palette
                                                                                      .action
                                                                                      .hover
                                                                                : undefined,
                                                                        "&:hover":
                                                                            {
                                                                                backgroundColor:
                                                                                    theme
                                                                                        .palette
                                                                                        .action
                                                                                        .hover,
                                                                            },
                                                                    }}
                                                                >
                                                                    <ListItemIcon>
                                                                        {
                                                                            subItem.icon
                                                                        }
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={
                                                                            subItem.label
                                                                        }
                                                                        primaryTypographyProps={{
                                                                            fontFamily:
                                                                                "Kalimati",
                                                                        }}
                                                                    />
                                                                </ListItem>
                                                            )
                                                        )}
                                                    </List>
                                                )}
                                        </React.Fragment>
                                    ))}
                                </List>
                                <Divider />
                            </Box>
                        </Drawer>

                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "fixed",
                                top: "70px",
                                left: 0,
                                right: 0,
                                zIndex: theme.zIndex.appBar - 2,
                                bgcolor: theme.palette.background.default,
                                py: 1,
                                px: 2,
                                boxShadow: 1,
                            }}
                        >
                            {renderMenuItems()}
                        </Box>
                        {/* Main Content with adjusted margin for DataTable */}
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                pt: {
                                    xs: "calc(48px + 64px)",
                                    md: "calc(64px + 64px)",
                                },
                                px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
                                maxWidth: "100vw",
                                width: "100%",
                                boxSizing: "border-box",
                                overflowX: "hidden",
                                margin: "0 auto",
                                mb: 4, // Add margin bottom
                            }}
                        >
                            <main>{children}</main>
                        </Box>
                        <AuthenticatedFooter />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AuthenticatedLayout;
