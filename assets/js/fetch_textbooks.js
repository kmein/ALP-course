// How to get access to your google spreadsheet:
// 1. open your file, and got to file > share > publish to the web
// 2. under link, choose which part of your spreadsheet you want to publish (all sheets or some sheets)
// 3. under embed, choose the format you want to embed it as. For our case, we embed it as a tsv file
// 4. click publish. All done!
// a link will show up which you should put instead of the one in the `const url` below. you can also use that link to download the file to your computer

// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQt5lC4vVsxpQat2VAQcIUO8QRb-mDPFqOImPfj42ugQBSjIuoo-O-QqLC0hg7lAtegem98gcWVKc2-/pub?output=tsv';

document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQt5lC4vVsxpQat2VAQcIUO8QRb-mDPFqOImPfj42ugQBSjIuoo-O-QqLC0hg7lAtegem98gcWVKc2-/pub?output=tsv'; // Replace with your spreadsheet URL
  const mandatoryItems = [];
  const optionalItems = [];

  fetch(url)
      .then(response => response.text())
      .then(data => {
          // Split the TSV data into rows and columns
          const rows = data.split('\n').map(row => row.split('\t'));

          // Iterate through rows, starting from the second row (index 1)
          for (let i = 1; i < rows.length; i++) {
              const rowData = rows[i];
              const item = {
                  isMandatory: rowData[0] === 'Mandatory', // Assuming 'Is Mandatory' column has 'Mandatory' or 'Optional'
                  author: rowData[1],
                  isEditor: rowData[2], // Assuming this column contains values like "Yes" or "No" or non-empty text
                  year: rowData[3],
                  title: rowData[4],
                  journal: rowData[5],
                  series: rowData[6],
                  place: rowData[7],
                  publisher: rowData[8],
                  link: rowData[9],
              };

              if (item.isMandatory) {
                  mandatoryItems.push(item);
              } else {
                  optionalItems.push(item);
              }
          }

          // Sort items alphabetically by Author field
          mandatoryItems.sort((a, b) => a.author.localeCompare(b.author));
          optionalItems.sort((a, b) => a.author.localeCompare(b.author));

          // Display the items in the existing <div> with the ID "textbooks-table"
          displayItems('Mandatory', mandatoryItems, 'textbooks-table');
          displayItems('Optional', optionalItems, 'textbooks-table');
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

  // Function to display items in the specified section and append them to the specified div
  function displayItems(sectionTitle, items, divId) {
      const sectionContainer = document.getElementById(divId);

      const sectionTitleElement = document.createElement('h3');
      sectionTitleElement.textContent = sectionTitle;
      sectionContainer.appendChild(sectionTitleElement);

      items.forEach(item => {
          const authorText = item.author ? `${item.author}` : '';
          const isEditorText = item.isEditor ? `, ${item.isEditor}` : '';
          const yearText = item.year ? ` (${item.year}) ` : '';
          const titleText = item.title ? (item.journal ? `${item.title}. ` : `<em>${item.title}</em>. `) : '';
          const journalText = item.journal ? (item.title ? `<em>${item.journal}</em>. ` : `<em>${item.journal}</em>. `) : '';
          const seriesText = item.series ? ` ${item.series}. ` : '';
          const placeText = item.place ? ` ${item.place}, ` : '';
          const publisherText = item.publisher ? `${item.publisher}. ` : '';
          const linkText = item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : '';

          const itemText = `${authorText}${isEditorText}${yearText}${titleText}${journalText}${seriesText}${placeText}${publisherText}${linkText}`;
          
          if (itemText.trim() !== '') {
              const itemElement = document.createElement('p');
              itemElement.innerHTML = itemText;
              sectionContainer.appendChild(itemElement);
          }
      });
  }

});