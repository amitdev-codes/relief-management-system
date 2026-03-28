import React from "react";
import { useState } from "react";
import AuthenticatedLayout from "@/Components/Layouts/AuthenticatedLayout";
import CreateEditForm from "../../Resources/CreateEditForm";
import PermissionGroup from "./PermissionGroup";
import { TextField } from "@mui/material";
import { usePage } from "@inertiajs/react";

const CreateEdit = ({ auth, modelName, resourceName,model }) => {
    const props = usePage().props;
    const [form, setForm] = useState({
        name: modelName?.name || '',
        permissions: modelName?.permissions.map(permission => permission.name) || [],
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <CreateEditForm
                resourceName={resourceName}
                model={model}
                modelName={modelName || ''}
                isEditMode={!!modelName}
                formData={form}
                itemId={modelName?.id}
            >
                <div className="space-y-4">
                    <TextField
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        label="Role Name"
                        id="name"
                        placeholder="Enter Name"
                        required
                        size="small"
                        fullWidth
                        className="mb-4"
                    />
                    <PermissionGroup
                        permissions={props.permissions}
                        modelValue={form.permissions}
                        onChange={(permissions) => setForm({ ...form, permissions })}
                        resourceName={resourceName}
                        isEditMode={!!modelName}
                    />
                </div>
            </CreateEditForm>
        </AuthenticatedLayout>
    );
};

export default CreateEdit;
