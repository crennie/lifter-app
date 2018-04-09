const express = require('express');
const database = require('./database');

const util = require('./util');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/meets', (req, res) => {
  try {
    database.connect((client, db) => {
      // Get and return all meets
      const driver = new database.CollectionDriver(db);      
      driver.findAll('meets', (err, meets) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // Decorate each meet result?
          const p = Promise.all(meets.map(meet => {
            return new Promise((res, rej) => {
              driver.find('meetResults', { meet_id: meet._id }, (err, meet_results) => {
                if (err) {
                  rej(err);
                } else {
                  meet.results = meet_results;
                  res();
                }
              });
            });
          }))
          .then(response => {
            res.status(200).send(meets);
          }).catch(error => {
            console.log('error', error);
            res.status(500).send("Error loading meet result data");
          });
        }
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/api/meet/:meet_id', (req, res) => {
  const params = req.params,
    meet_id = parseInt(params.meet_id);
  
  console.log(params, meet_id);
  if (!meet_id) {
    res.status(400).send("Invalid request parameters");
    return;
  }

  try {
    database.connect((client, db) => {
      const driver = new database.CollectionDriver(db);
      driver.findOne('meets', { '_id': meet_id }, (err, meet_data) => {
        console.log(err, meet_data);
        if (err) {
          res.status(500).send(err);
          client.close();
        } else if (util.isEmpty(meet_data)) {
          res.status(400).send('Invalid meet id');
          client.close();
        } else {
          driver.find('meetResults', { meet_id }, (err, meet_results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              meet_data.results = meet_results;
              res.status(200).send(meet_data);
            }

            client.close();
          });
        }
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/api/lifters', (req, res) => {
  try {
    database.connect((client, db) => {
      const driver = new database.CollectionDriver(db);      
      driver.findAll('lifters', (err, lifters) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(lifters);
        }
        client.close();
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));