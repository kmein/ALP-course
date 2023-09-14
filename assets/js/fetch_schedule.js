// How to get access to your google spreadsheet:
// 1. open your file, and got to file > share > publish to the web
// 2. under link, choose which part of your spreadsheet you want to publish (all sheets or some sheets)
// 3. under embed, choose the format you want to embed it as. For our case, we embed it as a tsv file
// 4. click publish. All done!
// a link will show up which you should put instead of the one in the `const url` below. you can also use that link to download the file to your computer

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk7NwiZU6OMwUIOcBSB7Yq1KPVMN3yZ0yZvDpLbH_tg-GbwuDNsbzt_iZxwq6KbcPIkxl0EAicJOzh/pub?output=tsv';

fetch(url)
  .then(response => response.text())
  .then(data => {
      // Split the TSV data into rows and columns
      const rows = data.split('\n').map(row => row.split('\t'));

      // Get the table element
      const table = document.getElementById('schedule-table');

      // Loop through the rows and create table rows and cells
      rows.forEach(rowData => {
          const row = document.createElement('tr');
          rowData.forEach(cellData => {
              const cell = document.createElement('td');
              cell.textContent = cellData;
              row.appendChild(cell);
          });
          table.appendChild(row);
      });
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });