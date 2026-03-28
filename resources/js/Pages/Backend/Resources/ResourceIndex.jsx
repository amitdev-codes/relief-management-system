import React, { useState, useCallback } from "react";
import AuthenticatedLayout from "@/Components/Layouts/AuthenticatedLayout";
import DataTable from "@/Components/Mui/DataTableComponent";
import { useDataFetching } from "@/hooks/useDataFetching";
import {
    List as ListIcon,
    Edit as EditIcon,
    Add as AddIcon,
    WidthFull,
} from "@mui/icons-material";

import BreadcrumbComponent from "@/Components/Inputs/BreadcrumbComponent";
const ResourceIndex = ({
    auth,
    columns,
    resourceName,
    modelName,
    title,
    dataRoute,
    formType,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const generateBreadcrumbItems = () => [
        {
            label: modelName,
            icon: <ListIcon />,
            href: route(`admin.${resourceName}.index`),
        },
    ];

    const {
        data,
        queryParams,
        handlePageChange,
        handlePageSizeChange,
        handleSortChange,
        handleSearchChange,
        refreshData,
    } = useDataFetching(dataRoute);

    const handleSearch = useCallback(
        (value) => {
            setSearchValue(value);
            handleSearchChange(value);
        },
        [handleSearchChange]
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <div style={{ margin: "16px 16px" }}>
                <BreadcrumbComponent
                    items={generateBreadcrumbItems()}
                    style={{ width: "100%" }}
                />
            </div>
            <DataTable
                columns={columns}
                rows={data.rows}
                loading={data.loading}
                rowCount={data.total}
                paginationMode="server"
                sortingMode="server"
                filterMode="server"
                page={queryParams.page}
                pageSize={queryParams.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onSortModelChange={handleSortChange}
                onSearchChange={handleSearch}
                searchValue={searchValue}
                routeName={resourceName}
                modelName={modelName}
                title={title}
                formType={formType}
                onDataChange={refreshData}
            />
        </AuthenticatedLayout>
    );
};

export default ResourceIndex;
