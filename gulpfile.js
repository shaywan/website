const gulp  = require('gulp');
const shell = require('gulp-shell');

const { fetchBlogPosts } = require('./src/services/dropbox');

const fetchPosts = () => {
  const webhookBody = process.env.INCOMING_HOOK_BODY;

  console.log(`INCOMING_HOOK_BODY: ${webhookBody}`);

  if (!webhookBody) return Promise.resolve();

  return fetchBlogPosts();
};

gulp.task('fetch-posts', fetchPosts);
gulp.task('gatsby', shell.task('gatsby build'))

gulp.task('build', gulp.series('fetch-posts', 'gatsby'));
