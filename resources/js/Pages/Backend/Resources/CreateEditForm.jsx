import React,{ useState} from "react";
import {
    Box,
    Button,
    Paper,
    CircularProgress,
    Typography,
} from "@mui/material";
import {
    List as ListIcon,
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import BreadcrumbComponent from "@/Components/Inputs/BreadcrumbComponent";
import { router } from "@inertiajs/react";

const CreateEditForm = ({
    resourceName,
    model,
    modelName,
    isEditMode,
    isSubmitting,
    formData,
    itemId,
    children,
}) => {
    const [alerts, setAlerts] = useState([]);
    const generateBreadcrumbItems = () => [
        {
            label: resourceName,
            icon: <ListIcon />,
            href: route(`admin.${resourceName}.index`),
        },
        {
            label: isEditMode ? "Edit" : "Create",
            icon: isEditMode ? <EditIcon /> : <AddIcon />,
        },
    ];
    const addAlert = (message, type = "success") => {
        setAlerts((prev) => [...prev, { message, type }]);
        setTimeout(() => setAlerts((prev) => prev.slice(1)), 3000);
    };
    const onGoBack = () => {
        window.history.back();
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        try {
            const endpoint = isEditMode
                ? route(`admin.${resourceName}.update`, { [model]: itemId })
                : route(`admin.${resourceName}.store`);
           router[isEditMode ? "put" : "post"](endpoint, formData, {
                onSuccess: () => {
                    const message = isEditMode
                    ? `${modelName} updated successfully`
                    : `${modelName} created successfully`;
                      addAlert(message);
                      router.visit(route(`admin.${resourceName}.index`), {
                        preserveScroll: true,
                        preserveState: true
                    });
                },
                onError: (error) => {
                    addAlert(
                        `Failed to ${isEditMode ? "update" : "create"} ${modelName}: ${error.message}`,
                        "error"
                    );
                },
            });
        } catch (error) {
            console.error(error);
            addAlert("An unexpected error occurred. Please try again.", "error");
        }
    };

    return (
        <Box className="container mx-auto p-4">
            <BreadcrumbComponent items={generateBreadcrumbItems()} />
            <Paper className="p-6">
                <Box className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="font-medium">
                        {`${
                            isEditMode ? "Edit" : "Create New"
                        } ${resourceName}`}
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        onClick={onGoBack}
                        variant="outlined"
                    >
                        Back
                    </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                    {children}
                    <Box className="flex justify-end gap-3 mt-6">
                        <Button variant="outlined" onClick={onGoBack}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress
                                        size={20}
                                        className="mr-2"
                                    />
                                    {isEditMode ? "Updating..." : "Creating..."}
                                </>
                            ) : isEditMode ? (
                                "Update"
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateEditForm;
