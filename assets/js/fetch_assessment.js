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

    generateFloatingHeader()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    console.log("I'm done fetching")

})

function generateFloatingHeader() {
    $(document).ready(function(){
    
      // putting lines by the pre blocks
      $("pre").each(function(){
        var pre = $(this).text().split("\n");
        var lines = new Array(pre.length+1);
        for(var i = 0; i < pre.length; i++) {
          var wrap = Math.floor(pre[i].split("").length / 70)
          if (pre[i]==""&&i==pre.length-1) {
            lines.splice(i, 1);
          } else {
            lines[i] = i+1;
            for(var j = 0; j < wrap; j++) {
              lines[i] += "\n";
            }
          }
        }
        $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
      });
    
      var headings = [];
    
      var collectHeaders = function(){
        headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
        console.log($(this).offset().top)
      }
    
      if($(".markdown-body h1").length > 1) $(".markdown-body h1").each(collectHeaders)
      else if($(".markdown-body h2").length > 1) $(".markdown-body h2").each(collectHeaders)
      else if($(".markdown-body h3").length > 1) $(".markdown-body h3").each(collectHeaders)
    
      console.log(headings)

      $(window).scroll(function(){
        if(headings.length==0) return true;
        var scrolltop = $(window).scrollTop() || 0;
        if(headings[0] && scrolltop < headings[0].top) {
          $(".current-section").css({"opacity":0,"visibility":"hidden"});
          return false;
        }
        $(".current-section").css({"opacity":1,"visibility":"visible"});
        for(var i in headings) {
          if(scrolltop >= headings[i].top) {
            $(".current-section .name").text(headings[i].text);
          }
        }
      });
    
      $(".current-section a").click(function(){
        $(window).scrollTop(0);
        return false;
      })
    });
    }(jQuery)