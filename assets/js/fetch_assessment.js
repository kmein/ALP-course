// How to get access to your google spreadsheet:
// 1. open your file, and got to file > share > publish to the web
// 2. under link, choose which part of your spreadsheet you want to publish (all sheets or some sheets)
// 3. under embed, choose the format you want to embed it as. For our case, we embed it as a tsv file
// 4. click publish. All done!
// a link will show up which you should put instead of the one in the `const url` below. you can also use that link to download the file to your computer

document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTY4KdG-1vKsbRbxmuUdZy2eaYroNxRtJ9A7FyvcNw8jTAeVJwQb7pDb28rKriwmlPYVlF05mumIZLW/pub?output=tsv';

    fetch(url)
    .then(response => response.text())
    .then(data => {
        // Split the TSV data into rows and columns
        const rows = data.split('\n').map(row => row.split('\t'));

        // Get the table element
        const table = document.getElementById('assessment-table');

        // Loop through the rows and create table rows and cells
        rows.forEach((rowData, rowIndex) => {
            const row = document.createElement('tr');
            rowData.forEach((cellData, cellIndex) => {
                const cell = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
                if (rowIndex === 0) {
                    // Apply bold style to the first row (title row)
                    cell.style.fontWeight = 'bold';
                }
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

})