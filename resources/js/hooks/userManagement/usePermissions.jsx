import { useState, useEffect } from 'react';

const usePermissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPermissions = async () => {

            try {
                const response = await fetch('/api/user/permissions');
                const data = await response.json();
                setPermissions(data.permissions || []);
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    return { permissions, loading };
};

export default usePermissions;
