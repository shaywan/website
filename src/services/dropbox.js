require("isomorphic-fetch");

const fs = require("fs-extra");
const path = require('path');

const { Dropbox } = require("dropbox");

const fetchBlogPosts = () => {
  const dbx = new Dropbox({
    accessToken: process.env.ACCESS_TOKEN_DROPBOX
  });

  // Remove and re-create the posts directory
  const POSTS_DIR = path.resolve(__dirname, '../pages/posts');
  // fs.removeSync(POSTS_DIR);
  // fs.ensureDirSync(POSTS_DIR);

  // TODO Logic for has_more
  return dbx
    .filesListFolder({ path: '' })
    .then(response => {
      response.entries.forEach(entry => {
        const { name, path_lower } = entry;

        if (entry['.tag'] === 'file') {
          dbx
            .filesDownload({ path: path_lower })
            .then(data => {
              const filename = path.resolve(POSTS_DIR, name)
              const fileContents = data.fileBinary.toString();
              console.log('fileContents:', fileContents)
            })
            .catch(error => {
              console.log(error);
            })
        }
      });
    });
}

module.exports = {
  fetchBlogPosts
}
