// InvoiceExport.js
import React from 'react';
import bktmun from '../../../../images/bktmun.png';
import gov from '../../../../images/gov.png';
import rms from '../../../../images/rms_logo.jpg';

const Bijak = ({ invoiceData, invoiceColumns, firstInstallmentInfo }) => {
    // in pdf
    const handleExportPdf = () => {
        if (invoiceData.length > 0) {
            // Create HTML string
            const htmlContent = `
                <html>
                <head>
                    <title>Invoice</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        body { font-family: 'Kalimati', sans-serif; }
                    </style>
                </head>
                <body class="bg-gray-100 p-5">
                    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-5"> <!-- Increased width here -->
                        <div class="flex justify-between items-center mb-2">
                         <div>
                                <img src="${gov}" alt="Logo" class="h-12"> <!-- Ensure this path is correct -->
                            </div>
                            <div class="text-center flex-1">
                                <h1 class="text-xl font-bold" style="font-family: 'Kalimati';">प्रदेश सरकार</h1> <!-- Increased font size -->
                                <p class="text-sm" style="font-family: 'Kalimati';">भक्तपुर नगरपालिका</p> <!-- Increased font size -->
                                <p class="text-sm" style="font-family: 'Kalimati';">बागमती प्रदेश, भक्तपुर </p> <!-- Increased font size -->
                            </div>
                            <div>
                                <img src="${bktmun}" alt="Logo" class="h-12"> <!-- Ensure this path is correct -->
                            </div>
                        </div>
                        <h2 class="text-xl font-bold mt-2 text-center">ऋण बिजक</h2> <!-- Increased font size -->
                        <table class="min-w-full border-collapse border border-gray-300 mt-2">
                            <thead class="bg-gray-200">
                                <tr>
                                    ${invoiceColumns.map(column => `<th class="border border-gray-300 px-2 py-1 text-sm">${column.headerName}</th>`).join('')} <!-- Increased font size -->
                                </tr>
                            </thead>
                            <tbody>
                                ${invoiceData.map(row => `
                                    <tr>
                                        ${invoiceColumns.map(column => `<td class="border border-gray-300 px-2 py-1 text-sm">${row[column.field]}</td>`).join('')} <!-- Increased font size -->
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <h2 class="text-lg font-bold mt-2">किस्ता बिबरण</h2>
                        <p class="mt-1 text-sm">आगामी किस्ता तिर्नुपर्ने मिति : ${firstInstallmentInfo.dueDate}</p> <!-- Increased font size -->
                        <p class="text-sm">किस्ता भुक्तानी गर्नुपर्ने रकम : ${firstInstallmentInfo.amount} (कुल ब्याज + किस्ता रकम)</p> <!-- Increased font size -->
                    </div>
                </body>
                </html>
            `;

            // Create a Blob from the HTML string
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            // Create a link and trigger a download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.html'; // File name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error('No invoice data available');
        }
    };

    return (
        <button onClick={handleExportPdf} className="bg-blue-500 text-white px-4 py-2 rounded">
            बिजक प्रिन्ट
        </button>
    );
};

export default Bijak;
