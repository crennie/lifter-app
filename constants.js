
module.exports = {
  DATA_DIRECTORY: `${__dirname}/data`,
  DATABASE_HOST: "mongodb://localhost",
  DATABASE_PORT: "27017",
  DATABASE_NAME: "lifterDb",


  /* template:
      {
        start_date: '',
        name: '',
        meet_directors: [''],
        results_url: ''
      }
      */
  MEET_DATA: [
    // 2017 MEETS
    {
      
      start_date: '2017-11-18',
      name: '2017 Pronick Memorial',
      meet_directors: ['Joel Klassen', 'Lynne Desautels'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2017/11/2017-Pronick-Memorial-Results.pdf'
    }, {
      start_date: '2017-11-18',
      name: '2017 Pronick Invitational',
      meet_directors: ['Joel Klassen', 'Lynne Desautels'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2017/11/2017-Pronick-Invitational-Results.pdf'
    }, {
      start_date: '2017-10-14',
      name: '2017 Vancity Showdown',
      meet_directors: ['Brian Rock', 'Gabe Festing'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2017-Vancity-Showdown-Powerlifting-Championships-Full-Results.pdf'
    }, {
      start_date: '2017-09-16',
      name: '2017 Fall Classic',
      meet_directors: ['Brian Rock'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2017-Fall-Classic-Full-Results.pdf'
    }, {
      start_date: '2017-08-06',
      name: '2017 Lift the Rock',
      meet_directors: ['Stephanie Needham'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2017-Lift-the-Rock-Full-Results-1.pdf'
    }, {
      start_date: '2017-07-08',
      name: '2017 Bent Iron Blitz',
      meet_directors: ['Zack Currie'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/Bent-Iron-Blitz-Full-Results-1.pdf'
    }, {
      start_date: '2017-06-10',
      name: '2017 Provincial Bench Press and Powerlifting',
      meet_directors: ['Gabe Festing', 'Bette Festing'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2017-BCPA-Provincials-Full-Results-1.pdf'
    }, {
      start_date: '2017-04-08',
      name: '2017 BLM Barbell Spring Showdown',
      meet_directors: ['Joel Klassen'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/BLM-Barbell-Full-Results.pdf'
    }, {
      start_date: '2017-02-18',
      name: '2017 Winter Open Powerlifting Championships',
      meet_directors: ['Wendy Yamazaki'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2017-BCPA-Winter-Open-Full-Results-as-of-May-19-2017.pdf'
    }, {
      start_date: '2017-01-14',
      name: `2017 UBC New Year's Powerlifting Championships`,
      meet_directors: ['Elizabeth Hu'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/UBC_2017_New_Years_Championships-FULL-RESULTS.pdf'
    },
    // 2016 MEETS
    {
      start_date: '2016-11-26',
      name: '2016 Pronick Invitational',
      meet_directors: ['Joel Klassen'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/Pronick-Invitational-Results.pdf'
    },
    {
      start_date: '2016-10-15',
      name: '2016 BCPA Fall Classic',
      meet_directors: ['Brian Rock'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/Fall-Classic-Results-FINAL.pdf'
    },
    {
      start_date: '2016-08-19',
      name: '2016 Western Championships',
      meet_directors: ['Gabe Festing', 'Zack Currie'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/Western-Championships-Full-Results-2016.pdf'
    },
    {
      start_date: '2016-08-07',
      name: '2016 Taranis Athletics Open',
      meet_directors: ['Sean Janzer'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/08/2016-Taranis-Athletics-Open-Results.pdf'
    },
    {
      start_date: '2016-06-25',
      name: '2016 BCPA Provincials',
      meet_directors: ['Gabe Festing'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2016-BCPA-Provincials-June-25-26-Langley-MD-Gabe-Festing.pdf'
    },
    {
      start_date: '2016-04-30',
      name: '2016 BLM Spring Showdown',
      meet_directors: ['Joel Klassen'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2016-BLM-Spring-Showdown%E2%80%93April-30%E2%80%93Abbotsford-MD-Joel-Klassen.pdf'
    },
    {
      start_date: '2016-03-26',
      name: '2016 Winter Open Redux',
      meet_directors: ['Randy Yee'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2016-Winter-Open-Redux%E2%80%93March-26%E2%80%93Richmond-MD-Randy-Yee.pdf'
    },
    {
      start_date: '2016-03-20',
      name: '2016 Winter Open',
      meet_directors: ['Elizabeth Anderson'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2016-Winter-Open%E2%80%93March-20%E2%80%93Richmond-MD-Elizabeth-Anderson.pdf'
    },
    {
      start_date: '2016-01-19',
      name: '2016 PR Strength Club New Year\'s Revolution',
      meet_directors: ['Pam Anderson'],
      results_url: 'http://bc-powerlifting.com/wp-content/uploads/2016/06/2016-PR-Strength-Club-New-Year%E2%80%99s-Revolution%E2%80%93Jan-19%E2%80%93Richmond-MD-Pam-Anderson.pdf'
    }

    ]
}