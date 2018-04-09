
const fs = require('fs');

const PdfParser = require('./pdfparser');
const CONSTANTS = require('./constants');

const DEBUG = false;

async function getDataFiles(filter_fn) {
  return new Promise((res, rej) => {
    fs.readdir(CONSTANTS.DATA_DIRECTORY, (err, files) => {
      if (err) {
        rej(err);
        return;
      }
      res(files.filter(filter_fn));
    });
  });
};

async function getPdfDataFiles() {
  return getDataFiles(file => file.endsWith('.pdf'));
}

async function getCsvDataFiles() {
  return getDataFiles(file => file.endsWith('.csv'));
}

async function saveAsCsvFile(pdf_parser) {
  if (DEBUG) { console.log(`Saving as CSV: `, pdf_parser); }
  return new Promise((res, rej) => {
    const csvLines = pdf_parser.toCsv();
    if (DEBUG) { console.log(csvLines); }
    if (!csvLines.length) {
      rej("Empty csv from pdf object");
      return;
    }
    let cleaned_lines = [];
    for (const line of csvLines) {
      if (line.split(',').length > 10) {
        cleaned_lines.push(line);
      }
    }
    const csv_filename = pdf_parser.file_path.replace('.pdf', '.csv');
    console.log(`Outputting to ${csv_filename}`);
    fs.writeFile(`${csv_filename}`, cleaned_lines.join('\n'), (err) => {
      if (err) {
        console.log(err);
        rej("CSV file writing error");
      }
      res();
    });
  });
}

async function parseAllPdfFiles() {
  return getPdfDataFiles().then(files => {
    for (const file_path of files) {
      if (DEBUG) { console.log('file_path=>', file_path); }
      const parser = new PdfParser(`${CONSTANTS.DATA_DIRECTORY}/${file_path}`);
      parser.parse().then(() => {
        saveAsCsvFile(parser);
      });
    }
  });
}

async function parsePdf(pdf_file_path) {
  const parser = new PdfParser(pdf_file_path);
  return parser.parse().then(() => {
    return saveAsCsvFile(parser);
  });
}


function trimString(s) {
  return String(s).replace(/^\s+|\s+$/g, '');
}

async function csvToDbEntries(csv_path) {
  return new Promise((res, rej) => {
    fs.readFile(csv_path, 'utf8', (err, data) => {
      if (err) {
        rej(err);
        return;
      }
      const lines = data.split('\n'),
        header_line = lines[0].split(','),
        content_lines = lines.slice(1);
      
      let db_entries = [];
      for (const line of content_lines) {
        const db_entry = {};
        line.split(',').forEach((column_value, i) => {
          db_entry[trimString(header_line[i])] = trimString(column_value);
        });
        db_entries.push(db_entry);
      }
      res(db_entries);
    });
  });
}


module.exports = {
  getCsvDataFiles,
  getPdfDataFiles,
  parseAllPdfFiles,

  parsePdf,

  csvToDbEntries
};
