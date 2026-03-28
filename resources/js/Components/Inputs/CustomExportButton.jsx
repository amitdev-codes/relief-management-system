import React, { useState, useMemo, Suspense } from "react";
import {
    Box, TextField, InputAdornment, Button,
    Menu, MenuItem, ListItemIcon, ListItemText
} from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    useGridApiContext,
    gridFilteredSortedRowIdsSelector,
    selectedGridRowsSelector,
} from "@mui/x-data-grid";
import {
    Search as SearchIcon,
    DeleteSweep as BulkDeleteIcon,
    FileDownload as ExportIcon,
    PictureAsPdf as PdfIcon,
    TableView as ExcelIcon,
    Print as PrintIcon,
    ContentCopy as CopyIcon,
    FileDownload as CsvIcon,
} from "@mui/icons-material";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const CustomExportButton = ({ columns }) => {
    const apiRef = useGridApiContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getExportData = () => {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const selectedRowIds = selectedGridRowsSelector(apiRef);
        const rowIds = selectedRowIds.length ? selectedRowIds : filteredSortedRowIds;

        const data = rowIds.map((id) => {
            const row = apiRef.current.getRow(id);
            const exportRow = {};
            columns.forEach((col) => {
                if (col.field !== 'actions') {
                    exportRow[col.headerName] = row[col.field];
                }
            });
            return exportRow;
        });

        return data;
    };

    const exportToExcel = () => {
        const data = getExportData();
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");
        XLSX.writeFile(wb, `export-${new Date().toISOString()}.xlsx`);
        handleClose();
    };

    const exportToPdf = () => {
        const data = getExportData();
        const doc = new jsPDF();

        const tableColumn = columns
            .filter(col => col.field !== 'actions')
            .map(col => col.headerName);
        const tableRows = data.map(item => Object.values(item));

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { top: 20 }
        });

        doc.save(`export-${new Date().toISOString()}.pdf`);
        handleClose();
    };
    const exportToCsv = () => {
        const data = getExportData();
        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => Object.values(e).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `export-${new Date().toISOString()}.csv`);
        document.body.appendChild(link);
        link.click();
        handleClose();
    };

    const printData = () => {
        const data = getExportData();
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write('<table border="1"><thead><tr>');
        columns.forEach(col => {
            if (col.field !== 'actions') {
                printWindow.document.write(`<th>${col.headerName}</th>`);
            }
        });
        printWindow.document.write('</tr></thead><tbody>');
        data.forEach(item => {
            printWindow.document.write('<tr>');
            columns.forEach(col => {
                if (col.field !== 'actions') {
                    printWindow.document.write(`<td>${item[col.headerName]}</td>`);
                }
            });
            printWindow.document.write('</tr>');
        });
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        handleClose();
    };

    const copyToClipboard = () => {
        const data = getExportData();
        const text = data.map(item => Object.values(item).join("\t")).join("\n");
        navigator.clipboard.writeText(text).then(() => {
            alert("Data copied to clipboard!");
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
        handleClose();
    };

    return (
        <>
            <Button
                color="primary"
                size="small"
                startIcon={<ExportIcon />}
                onClick={handleClick}
            >
                Export
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={copyToClipboard}>
                    <ListItemIcon>
                    <CopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                </MenuItem>

                <MenuItem onClick={exportToCsv}>
                    <ListItemIcon>
                    <CsvIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>CSV</ListItemText>
                </MenuItem>


                <MenuItem onClick={exportToExcel}>
                    <ListItemIcon>
                        <ExcelIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Excel</ListItemText>
                </MenuItem>
                <MenuItem onClick={exportToPdf}>
                    <ListItemIcon>
                        <PdfIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>PDF</ListItemText>
                </MenuItem>
                <MenuItem onClick={printData}>
                    <ListItemIcon>
                    <PrintIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Print</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
export default CustomExportButton;
