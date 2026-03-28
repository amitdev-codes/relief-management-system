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
    const roles = usePage().props.additionalData.roles;
    const getDefaultFormData = () => ({
        name: "",
        mobile_number: "",
        email: "",
        password: "",
        role: "4",
        status: false,
    });

    const [formData, setFormData] = useState(getDefaultFormData());
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode === "edit" && data) {
            setFormData({
                name: data.name || "",
                mobile_number: data.mobile_number || "",
                email: data.email || "",
                password: "",
                role: roles.find(role => role.label === data.role)?.value || "4",
                status: Boolean(data.status) || false,
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
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.mobile_number) {
            newErrors.mobile_number = "Mobile number is required.";
        } else if (formData.mobile_number.length !== 10) {
            newErrors.mobile_number = "Mobile number must be exactly 10 digits.";
        }
        if (mode === "create" && !formData.password) {
            newErrors.password = "Password is required.";
        }
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
            title={mode === "create" ? "Create User" : "Edit User"}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <PhoneInput
                        label="Mobile No"
                        name="mobile_number"
                        type="tel"
                        required
                        value={formData.mobile_number}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <PasswordInput
                        label="Password"
                        name="password"
                        required={mode === "create"}
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={3}>
                    <SearchableSelect
                        label="Select Role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleSelectChange}
                        options={roles}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <StatusSwitch
                        label="Status"
                        name="status"
                        checked={formData.status}
                        onChange={(e) => {
                            setFormData(prev => ({
                                ...prev,
                                status: e.target.checked,
                            }));
                        }}
                    />
                </Grid>
            </Grid>
        </DynamicFormModal>
    );
};

export default CreateEdit;
