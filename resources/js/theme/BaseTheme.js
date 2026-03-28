// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // Light mode colors (unchanged)
                  primary: {
                      main: "#1976d2",
                  },
                  secondary: {
                      main: "#dc004e",
                  },
                  background: {
                      default: "#f5f5f5",
                      paper: "#ffffff",
                  },
                  text: {
                      primary: "#000000",
                      secondary: "#555555",
                  },
              }
            : {
                  // Dark mode colors (unchanged)
                  primary: {
                      main: "#90caf9",
                  },
                  secondary: {
                      main: "#f48fb1",
                  },
                  background: {
                      default: "#121212",
                      paper: "#1e1e1e",
                  },
                  text: {
                      primary: "#ffffff",
                      secondary: "#bbbbbb",
                  },
              }),
    },
    typography: {
        fontFamily: "Kalimati, sans-serif",

        h1: {
            fontSize: "2.5rem", // Default
            "@media (max-width:600px)": {
                fontSize: "2rem", // Mobile
            },
            "@media (min-width:600px) and (max-width:960px)": {
                fontSize: "2.25rem", // Tablets
            },
            "@media (min-width:960px) and (max-width:1920px)": {
                fontSize: "2.75rem", // Desktops
            },
            "@media (min-width:1920px) and (max-width:2560px)": {
                fontSize: "3rem", // Larger screens (e.g., 2K)
            },
            "@media (min-width:2560px)": {
                fontSize: "3.5rem", // 4K Screens
            },
        },
        h2: {
            fontSize: "2rem", // Default
            "@media (max-width:600px)": {
                fontSize: "1.75rem", // Mobile
            },
            "@media (min-width:600px) and (max-width:960px)": {
                fontSize: "1.875rem", // Tablets
            },
            "@media (min-width:960px) and (max-width:1920px)": {
                fontSize: "2.25rem", // Desktops
            },
            "@media (min-width:1920px) and (max-width:2560px)": {
                fontSize: "2.5rem", // Larger screens (e.g., 2K)
            },
            "@media (min-width:2560px)": {
                fontSize: "2.75rem", // 4K Screens
            },
        },
        body1: {
            fontSize: "1rem", // Default
            "@media (max-width:600px)": {
                fontSize: "0.875rem", // Mobile
            },
            "@media (min-width:600px) and (max-width:960px)": {
                fontSize: "0.9375rem", // Tablets
            },
            "@media (min-width:960px) and (max-width:1920px)": {
                fontSize: "1.0625rem", // Desktops
            },
            "@media (min-width:1920px) and (max-width:2560px)": {
                fontSize: "1.125rem", // Larger screens (e.g., 2K)
            },
            "@media (min-width:2560px)": {
                fontSize: "1.25rem", // 4K Screens
            },
        },
        body2: {
            fontSize: "0.875rem", // Default
            "@media (max-width:600px)": {
                fontSize: "0.75rem", // Mobile
            },
            "@media (min-width:600px) and (max-width:960px)": {
                fontSize: "0.8125rem", // Tablets
            },
            "@media (min-width:960px) and (max-width:1920px)": {
                fontSize: "0.9375rem", // Desktops
            },
            "@media (min-width:1920px) and (max-width:2560px)": {
                fontSize: "1rem", // Larger screens (e.g., 2K)
            },
            "@media (min-width:2560px)": {
                fontSize: "1.125rem", // 4K Screens
            },
        },
        h3: {
            fontSize: "1.75rem", // Default
            "@media (max-width:600px)": {
                fontSize: "1.5rem", // Mobile
            },
            "@media (min-width:600px) and (max-width:960px)": {
                fontSize: "1.625rem", // Tablets
            },
            "@media (min-width:960px) and (max-width:1920px)": {
                fontSize: "2rem", // Desktops
            },
            "@media (min-width:1920px) and (max-width:2560px)": {
                fontSize: "2.25rem", // Larger screens (e.g., 2K)
            },
            "@media (min-width:2560px)": {
                fontSize: "2.5rem", // 4K Screens
            },
        },
        tab: {
            fontSize: "1rem", // Default size
            "@media (max-width:600px)": { fontSize: "1.25rem" },
            "@media (min-width:960px)": { fontSize: "1.50rem" },
            "@media (min-width:1280px)": { fontSize: "1.75rem" },
            "@media (min-width:1920px)": { fontSize: "1.85rem" },
            "@media (min-width:2560px)": { fontSize: "2.5rem" },
        },
        chip: {
            fontSize: "0.875rem",
            "@media (max-width:600px)": {
                fontSize: "0.75rem",
            },
            "@media (min-width:1920px)": {
                fontSize: "1rem",
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
            xxl: 2560, // Added for 4K screens
        },
    },
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    padding: "1rem",
                    "@media (max-width:600px)": {
                        padding: "0.5rem",
                    },
                    "@media (min-width:1920px)": {
                        padding: "1.5rem",
                    },
                    "@media (min-width:2560px)": {
                        // For 4K screens
                        padding: "2rem",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    margin: "1rem",
                    "@media (max-width:600px)": {
                        margin: "0.5rem",
                    },
                    "@media (min-width:1920px)": {
                        margin: "1.5rem",
                    },
                    "@media (min-width:2560px)": {
                        // For 4K screens
                        margin: "2rem",
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: "240px",
                    "@media (max-width:600px)": {
                        width: "200px",
                    },
                    "@media (min-width:1920px)": {
                        width: "300px",
                    },
                    "@media (min-width:2560px)": {
                        // For 4K screens
                        width: "360px",
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    "& .MuiDataGrid-cell": {
                        fontSize: "0.875rem",
                        "@media (max-width:600px)": {
                            fontSize: "0.75rem",
                        },
                        "@media (min-width:1920px)": {
                            fontSize: "1rem",
                        },
                        "@media (min-width:2560px)": {
                            // For 4K screens
                            fontSize: "1.125rem",
                        },
                    },
                    "& .MuiDataGrid-columnHeader": {
                        fontSize: "0.9375rem",
                        "@media (max-width:600px)": {
                            fontSize: "0.8125rem",
                        },
                        "@media (min-width:1920px)": {
                            fontSize: "1.0625rem",
                        },
                        "@media (min-width:2560px)": {
                            // For 4K screens
                            fontSize: "1.25rem",
                        },
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: "inherit", // Inherit size from typography
                },
            },
        },
    },
});

// Function to create the theme
export const BaseTheme = (mode) => createTheme(getDesignTokens(mode));

export default BaseTheme;
