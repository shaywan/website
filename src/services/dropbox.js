require("isomorphic-fetch");

const fs = require("fs-extra");
const path = require('path');

const { Dropbox } = require("dropbox");

const fetchBlogPosts = () => {
  const dbx = new Dropbox({
    accessToken: process.env.ACCESS_TOKEN_DROPBOX
  });

  // Remove and re-create the posts directory
  // const POSTS_DIR = path.resolve(__dirname, '../pages/posts');
  // fs.removeSync(POSTS_DIR);
  // fs.ensureDirSync(POSTS_DIR);

  return dbx
    .filesListFolder({ path: '' })
    .then(response => {
      console.log(response);
    });
}

module.exports = {
  fetchBlogPosts
}
