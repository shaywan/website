const axios = require('axios');
const fs = require('fs');
const gulp  = require('gulp');
const shell = require('gulp-shell');

const getData = () => {
  console.log(`INCOMING_HOOK_BODY: ${process.env.INCOMING_HOOK_BODY}`);

  if (!process.env.INCOMING_HOOK_BODY) return Promise.resolve();

  const endpoint = 'https://api.chucknorris.io/jokes/random';


  return axios.get(endpoint)
    .then(response => {
      fs.writeFile('src/data/joke.json', JSON.stringify(response.data), (error) => {
        if (error) console.log(error);

        console.log('API Success: File saved');
      })
    })
    .catch(error => {
      console.log(`API Error: ${error}`);
    });
};

gulp.task('get-data', getData);
gulp.task('gatsby', shell.task('gatsby build'))

gulp.task('build', gulp.series('get-data', 'gatsby'));
