// How to get access to your google spreadsheet:
// 1. open your file, and got to file > share > publish to the web
// 2. under link, choose which part of your spreadsheet you want to publish (all sheets or some sheets)
// 3. under embed, choose the format you want to embed it as. For our case, we embed it as a tsv file
// 4. click publish. All done!
// a link will show up which you should put instead of the one in the `const url` below. you can also use that link to download the file to your computer

// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk7NwiZU6OMwUIOcBSB7Yq1KPVMN3yZ0yZvDpLbH_tg-GbwuDNsbzt_iZxwq6KbcPIkxl0EAicJOzh/pub?output=tsv';

document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk7NwiZU6OMwUIOcBSB7Yq1KPVMN3yZ0yZvDpLbH_tg-GbwuDNsbzt_iZxwq6KbcPIkxl0EAicJOzh/pub?output=tsv'; // Replace with your spreadsheet URL

  fetch(url)
      .then(response => response.text())
      .then(data => {
          // Split the TSV data into rows and columns
          const rows = data.split('\n').map(row => row.split('\t'));

          // Get the container element where you want to display the content
          const container = document.getElementById('schedule-table');

          // Iterate through rows, starting from the second row (index 1)
          for (let i = 1; i < rows.length; i++) {
              const rowData = rows[i];
              const item = {
                  number: rowData[0],
                  topic: rowData[1],
                  assignment: rowData[2],
                  toolsAndResources: rowData[3],
                  location: rowData[4],
                  type: rowData[5],
              };

              // Check if any cell in the row is empty except for the "number" field
              if (Object.keys(item).filter(key => key !== 'number').some(key => item[key] !== '')) {
                  // Create a new lesson section
                  const lessonSection = document.createElement('div');
                  lessonSection.classList.add('lesson');

                  // Create the lesson header (skip "number")
                  if (item.number) {
                      const lessonHeader = document.createElement('h3');
                      lessonHeader.innerHTML = `Lesson ${item.number}`;
                      lessonSection.appendChild(lessonHeader);
                  }

                  // Create and add the content for each cell (capitalize headers)
                  Object.keys(item).forEach(key => {
                      if (key !== 'number' && item[key] !== '') {
                          let headerText = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the header
                          let valueText = item[key];
                          
                          // Customize transformation for "ToolsAndResources"
                          if (key.toLowerCase() === 'toolsandresources') {
                            headerText = headerText.replace(/toolsandresources/gi, 'Tools and Resources');
                        }
                          
                          const itemLine = document.createElement('p');
                          itemLine.innerHTML = `<strong>${headerText}:</strong> ${valueText}`;
                          lessonSection.appendChild(itemLine);
                      }
                  });

                  // Append the lesson section to the container
                  container.appendChild(lessonSection);
              }
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});


