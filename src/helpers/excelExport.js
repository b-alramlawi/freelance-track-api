const ExcelJS = require('exceljs');

// Function to export tasks to an Excel file
const exportTasksToExcel = async (tasks, res) => {
    try {
        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tasks');

        // Define the headers for the Excel file and apply styling with borders but no colors
        const headerStyle = {
            font: {bold: true},
            border: {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'},
            },
        };

        worksheet.columns = [
            {header: 'Task Title', key: 'title', width: 20, style: headerStyle},
            {header: 'Status', key: 'status', width: 15, style: headerStyle},
            {header: 'Estimated Hours', key: 'estimatedHours', width: 15, style: headerStyle},
        ];

        // Add data (tasks) to the worksheet with borders but no colors
        tasks.forEach((task) => {
            worksheet.addRow({
                title: task.title,
                status: task.status,
                estimatedHours: task.estimatedHours,
            }).eachCell({includeEmpty: true}, (cell) => {
                cell.border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'},
                };
            });
        });

        // Set the content type and headers for the response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=task_export.xlsx');

        // Send the Excel file as a response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        // Handle errors here
    }
};

module.exports = {
    exportTasksToExcel,
};
