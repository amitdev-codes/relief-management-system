import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

export const useDataFetching = (dataRoute) => {
    const [data, setData] = useState({ rows: [], total: 0, loading: false });
    const [queryParams, setQueryParams] = useState({
        draw: 1,
        page: 0,
        pageSize: 10,
        sortField: null,
        sortDirection: null,
        search: ""
    });

    const fetchData = useCallback(async (params) => {
        try {
            const response = await axios.get(dataRoute, {
                params: {
                    draw: params.draw,
                    page: params.page + 1,
                    length: params.pageSize,
                    search: { value: params.search },
                    order: params.sortField ? [{
                        column: params.sortField,
                        dir: params.sortDirection
                    }] : []
                },
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json"
                }
            });

            return {
                rows: response.data.data,
                total: response.data.recordsTotal
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }, [dataRoute]);

    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setQueryParams(prev => ({
                ...prev,
                search: searchValue,
                page: 0
            }));
        }, 300),
        []
    );

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setData(prev => ({ ...prev, loading: true }));
            try {
                const result = await fetchData(queryParams);
                if (isMounted) {
                    setData({
                        rows: result.rows,
                        total: result.total,
                        loading: false
                    });
                }
            } catch (error) {
                if (isMounted) {
                    setData(prev => ({ ...prev, loading: false }));
                }
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, [queryParams, fetchData]);

    return {
        data,
        queryParams,
        handlePageChange: useCallback((newPage) => {
            setQueryParams(prev => ({ ...prev, page: newPage }));
        }, []),
        handlePageSizeChange: useCallback((newPageSize) => {
            setQueryParams(prev => ({ ...prev, pageSize: newPageSize, page: 0 }));
        }, []),
        handleSortChange: useCallback((sortModel) => {
            setQueryParams(prev => ({
                ...prev,
                sortField: sortModel[0]?.field || null,
                sortDirection: sortModel[0]?.sort || null
            }));
        }, []),
        handleSearchChange: debouncedSearch,
        refreshData: useCallback(() => {
            setQueryParams(prev => ({ ...prev, draw: prev.draw + 1 }));
        }, [])
    };
};
