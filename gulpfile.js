const axios = require('axios');
const fs = require('fs');
const gulp  = require('gulp');
const shell = require('gulp-shell');

const getData = () => {
  const endpoint = 'https://api.chucknorris.io/jokes/random';

  console.log(`POST body: ${process.env.INCOMING_HOOK_BODY}`);

  return axios.get(endpoint)
    .then(response => {
      fs.writeFile('src/data/joke.json', JSON.stringify(response.data), (error) => {
        if (error) console.log(error);

        console.log('Success: File saved');
      })
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
};

gulp.task('get-data', getData);
gulp.task('gatsby', shell.task('gatsby build'))

gulp.task('build', gulp.series('get-data', 'gatsby'));
