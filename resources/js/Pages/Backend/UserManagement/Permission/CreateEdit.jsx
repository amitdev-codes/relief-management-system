import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DynamicFormModal from "@/Components/Mui/DynamicFormModalComponent";
import { TextInput } from "@/Components/Inputs/TextInput";
import { usePage } from "@inertiajs/react";

const CreateEdit = ({ open, onClose, mode, data, onSubmit }) => {
    const roles = usePage().props.additionalData.roles;
    const getDefaultFormData = () => ({
        name: "",
    });

    const [formData, setFormData] = useState(getDefaultFormData());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === "edit" && data) {
            setFormData({
                name: data.name || "",
            });
        } else {
            setFormData(getDefaultFormData());
        }
    }, [mode, data, roles]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return; // Prevent submission if validation fails
        }
        const submitData = { ...formData };
        if (mode === "edit" && !submitData.password) {
            delete submitData.password;
        }
        onSubmit(submitData);
    };

    return (
        <DynamicFormModal
            open={open}
            onClose={onClose}
            formType="modal"
            mode={mode}
            title={mode === "create" ? "Create Permission" : "Edit Permission"}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextInput
                        label="Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </DynamicFormModal>
    );
};

export default CreateEdit;
