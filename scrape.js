/**
 * @fileOverview Scrape some pre-defined sites for lifter data.
 * Save the scraped data into flat files and then into the DB.
 */

/* TODO: Don't need this, all BCPA records are in PDF files
const rp = require('request-promise');
const cheerio = require('cheerio');
const rp_options = {
  transform: function (body) {
    return cheerio.load(body);
  }
};
// TODO: DEPRECATED callApi fn

  let request_options = {...rp_options};
  request_options.uri = uri;

  //console.log(request_options);
  await rp(request_options)
    .then(($) => {
      const filename = uri.replace(/\//g, '_', 'g');

      return new Promise((res, rej) => {
        fs.writeFile(`${DATA_DIRECTORY}/${filename}`, $('html'), 'binary', (err) => {
          if (err) {
            rej(err);
          } else {
            console.log("The pdf file was saved");
            res(filename);
          }
        });
      }); 
    })
    .catch((err) => {
      console.log("Error getting PDF page information:", err);
    });
*/

const http = require('http');
const fs = require('fs');
const CONSTANTS = require('./constants');

async function doesFileExist(file_path) {
  return new Promise((res, rej) => {
    fs.stat(file_path, (err, stat) => {
      if (err === null) {
        res(true);
      } else if (err.code === 'ENOENT') {
        res(false);
      } else {
        // An unknown error
        rej(err);
      }
    });
  });
}

async function downloadWebPdf(pdf_url, options) {
  options = options || {};
  const pdf_filename = pdf_url.replace(/\//g, '_', 'g'),
    dest_filename = `${CONSTANTS.DATA_DIRECTORY}/${pdf_filename}`;
  
    // Check if file exists, and if it does, return
  return new Promise((res, rej) => {
    doesFileExist(dest_filename).then((exists) => {
      if (exists && !options.force_download) {
        res(dest_filename);
      } else {
        console.log(`[Info] Performing HTTP GET to ${pdf_url}`);
        request = http.get(pdf_url,
          (response) => {
            const pdf_file = fs.createWriteStream(dest_filename, 'binary');
            response.pipe(pdf_file);
            pdf_file.on('error', (err) => {
              rej(err);
            });
            pdf_file.on('finish', () => {
              pdf_file.close(() => {
                // Resolve the Promise once close is complete
                res(dest_filename);
              });
            });
          },
          (err) => {
            console.log("Error getting PDF page information:", err);
            rej(err);
          });
      }
    });
  });
}

module.exports = {
  downloadWebPdf
}