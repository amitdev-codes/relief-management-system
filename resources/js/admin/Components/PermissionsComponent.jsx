import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

const PermissionsComponent = () => {
    const [permissions, setPermissions] = useState([]);
    const { props } = usePage();

    useEffect(() => {
        if (props.permissions) {
            setPermissions(props.permissions);
        } else {
            router.get(route('permissions.index'), {}, {
                onSuccess: ({ props }) => {
                    setPermissions(props.permissions);
                }
            });
        }
    }, [props.permissions]);

    return (
        <div>
            {/* Render permissions */}
        </div>
    );
};

export default PermissionsComponent;
