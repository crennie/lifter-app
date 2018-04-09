
const pdfreader = require('pdfreader');

class PdfReader {
  constructor(pdf_file_path) {
    this.file_path = pdf_file_path;
  };

  resetInternalPageMap() {
    this.pageMaps = [];
  };

  async parse() {
    this.resetInternalPageMap();
    return new Promise((res, rej) => {
      let page_rows = {};
      new pdfreader.PdfReader().parseFileItems(this.file_path, (err, item) => {
        if (err) {
          console.log(`[Error] Couldn't parse PDF file or PDF file value`, err);
          rej(err);
        } else if (!item) {
          // Save the latest page we've parsed
          this.pageMaps[this.pageMaps.length] = page_rows;
          res();
        } else if (item.page) {
          // Start of new page
          if (item.page <= 1) { // If this is the first page, skip
            return;
          }
          this.pageMaps[item.page - 2] = page_rows;
          page_rows = {}; // clear rows for next page
        } else if (item.text) {
          (page_rows[item.y] = page_rows[item.y] || []).push(item.text);
        }
      });
    });
  };

  toCsv() {
    let rows_to_return = [];
    for (const pageMap of this.pageMaps) {
      Object.keys(pageMap) // => array of y-positions (type: float) 
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions 
        .forEach((y) => {
          const row_string = (pageMap[y] || []).join(',');
          if (row_string) {
            rows_to_return.push(row_string);
          }
        });
    }
    return rows_to_return;
  };
};

module.exports = PdfReader;
