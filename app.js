const scrape = require('./scrape');
const parse = require('./parse');
const database = require('./database');
const util = require('./util');
const CONSTANTS = require('./constants');

async function downloadAllPdfs() {
  // Download full list of files.  Don't need this, will mostly parse meet-by-meet
  const url_list = CONSTANTS.MEET_DATA.map(data => data.results_url);
  return Promise.all(url_list.map(url => scrape.downloadWebPdf(url) )).then(() => {
    console.log('All URL downloads finished');
  }).catch((err) => {
    console.log(err);
    console.log("Some files failed to download!");
  });
}

async function createMeets(meets_data) {
  return new Promise((res, rej) => {
    try {
      database.connect((client, db) => {
        const meets = db.collection('meets');
        const db_meets_data = meets_data.map(meet_data=> {
          const cloned_data = { ...meet_data };
          delete cloned_data._local_csv;
          return cloned_data;
        });
        meets.insert(db_meets_data, {w:1}, (err, result) => {
          console.log(err, result);
          client.close();
          res();
        });
      });
    } catch (err) {
      rej(err);
    }
  });
}

async function addMeetResultDataToMeet(meet_data) {
  
  return new Promise((res, rej) => {
    parse.csvToDbEntries(`${CONSTANTS.DATA_DIRECTORY}/${meet_data._local_csv}`).then(db_entries => {
      db_entries.map(entry => { entry.meet_id = meet_data._id });
      try {
        database.connect((client, db) => {
          const meet_results = db.collection('meetResults');
          console.log(db_entries);
          meet_results.insert(db_entries, {w:1}, (err, result) => {
            client.close();
            res();
          });
        });
      } catch (err) {
        rej(err);
      }
    });
  });
}


async function scrapeAndParseMeetData(meet_data) {
  return scrape.downloadWebPdf(meet_data.results_url)
    .then(parse.parsePdf);
}

async function scrapeAndParseMeets(meets_data) {
  return Promise.all(meets_data.map(meet_data => scrapeAndParseMeetData(meet_data)));
}

async function addAllMeetResultsData(meets_data) {
  return Promise.all(meets_data.map(meet_data => addMeetResultDataToMeet(meet_data)));
}


// Create global variable for now... this is not the best
let lifters = new Set();
async function clearDatabase() {
  // Clears meet data and lifter data
  return new Promise((res, rej) => {
    try {
      database.connect((client, db) => {
        const lifters = db.collection('lifters'),
          meet_results = db.collection('meetResults');
        
        lifters.deleteMany({}, err => {
          if (err) {
            client.close();
            throw err;
          }
          meet_results.deleteMany({}, err => {
            if (err) {
              client.close();
              throw err;
            }
            client.close();
            res();
          });
        });
      });
    } catch (err) {
      rej(err);
    }
  });
}

async function generateDataForOneMeet(meet_data) {
  return new Promise((res,rej) => {
    // For each meet, create the required criteria
    parse.csvToDbEntries(`${CONSTANTS.DATA_DIRECTORY}/${meet_data._local_csv}`).then(db_meet_results => {
      console.log(db_meet_results, meet_data);
      db_meet_results.map(db_result => {
        const lifter_name = db_result.Name;
        delete db_result.Name;

        // Add any lifter name to the lifters name list
        lifters.add(lifter_name);

        // Get the positional index of the lifter name in the list.  This will be the lifter id.
        // Add it into the meet result instead of the Name
        const lifter_id = Array.from(lifters).findIndex(val => val === lifter_name) + 1;
        db_result.lifter_id = lifter_id;
        console.log(lifter_name, lifter_id);      

        // Add the meet id into the result
        db_result.meet_id = meet_data._id
      });
      
      try {
        database.connect((client, db) => {
          const meet_results = db.collection('meetResults');
          meet_results.insert(db_meet_results, {w:1}, (err, result) => {
            if (err) {
              client.close();
              throw err;
            }
            client.close();
            res();
          });
        });
      } catch (err) {
        rej(err);
      }
    });
  });
}

async function addAllLifters() {
  return new Promise((res, rej) => {
    const db_lifters = Array.from(lifters).map((lifter, i) => {
      return { _id: i+1, Name: lifter };
    });
    console.log(`Adding all lifters:`, db_lifters);
    try {
      database.connect((client, db) => {
        const lifters = db.collection('lifters');
        lifters.insert(db_lifters, {w:1}, (err, result) => {
          if (err) {
            client.close();
            throw err;
          }
          client.close();
          res();
        });
      });
    } catch (err) {
      rej(err);
    }
  });
}

async function regenerateDatabase(meets_data) {
  lifters = new Set();

  return util.promiseSerial([
    clearDatabase,
    ...(meets_data.map(meet_data => () => generateDataForOneMeet(meet_data))),
    addAllLifters
  ]);
}


function pdf_url_to_csv(pdf_url) {
  return pdf_url.replace(/\//g, '_').replace('.pdf', '.csv');
}

function add_meet_metadata(meet_data, index) {
  // Parse the local_csv (dependent on results_url) and create the ids
  meet_data._local_csv = meet_data._local_csv ? meet_data._local_csv : pdf_url_to_csv(meet_data.results_url);
  meet_data._id = meet_data._id ? meet_data._id : index+1;
  return meet_data;
}


async function fullLoad() {
  const meets_with_metadata = CONSTANTS.MEET_DATA.map(add_meet_metadata);
  scrapeAndParseMeets(meets_with_metadata)
    .then(createMeets(meets_with_metadata))
    .then(() => regenerateDatabase(meets_with_metadata))
    .then(() => console.log("All files downloaded, all meets loaded.") )
}

fullLoad();

/*
for (const meet_data of meets_with_metadata) {
  // Goes through all users defined in results
  parse.csvToDbEntries(`${CONSTANTS.DATA_DIRECTORY}/${meet_data._local_csv}`).then(db_entries => {
    // Extract user info to users table, and then 

    console.log(db_entries);
  });
  addMeetResultDataToMeet(meet_data);
}
*/

/*
 Steps to perform:
 - download the meets (optional if pdf files already present)
 - convert pdfs into CSVs (optional based on flag?)
 -- Regenerate the database ??  Or just do additive changes?
 - add all files into database?

scrapeAndParseMeets(meets_with_metadata)
  .then(createMeets(meets_with_metadata))
  .then(() => regenerateDatabase(meets_with_metadata))
  .then(() => console.log("All files downloaded, all meets loaded.") )
*/