const path = require('path');

const createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/post.js');

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
  }`)
    .then(res => {
    if (res.errors) Promise.reject(res.errors);

    res.data.allMarkdownRemark.edges.forEach(edge => {
      const { node } = edge;

      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  });
};

exports.createPages = createPages;
