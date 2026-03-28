import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import DynamicFormModal from "@/Components/Mui/DynamicFormModalComponent";
import { TextInput } from "@/Components/Inputs/TextInput";
import { PhoneInput } from "@/Components/Inputs/PhoneInput";
import { PasswordInput } from "@/Components/Inputs/PasswordInput";
import { SearchableSelect } from "@/Components/Inputs/SearchableSelect";
import { StatusSwitch } from "@/Components/Inputs/StatusSwitch";
import { usePage } from "@inertiajs/react";

const CreateEdit = ({ open, onClose, mode, data, onSubmit }) => {
    const getDefaultFormData = () => ({
        name: "",
        name_np: "",
        description: "",
        status: "",
    });

    const [formData, setFormData] = useState(getDefaultFormData());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === "edit" && data) {
            setFormData({
                name: "",
                name_np: "",
                description: "",
                status: "",
            });
        } else {
            setFormData(getDefaultFormData());
        }
    }, [mode, data]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.name_np) newErrors.name_np = "Name Np is required.";
        if (!formData.description)
            newErrors.description = "Description is required.";
        if (!formData.status) newErrors.status = "Status is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
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
            title={
                mode === "create"
                    ? "Create ReliefPrioritization"
                    : "Edit ReliefPrioritization"
            }
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Name Np"
                        name="name_np"
                        type="text"
                        required
                        value={formData.name_np}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Description"
                        name="description"
                        type="text"
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Status"
                        name="status"
                        type="text"
                        required
                        value={formData.status}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </DynamicFormModal>
    );
};

export default CreateEdit;
