import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from "../components/layout"

// This is a view template for an individual post
export default function Template ({ data }) {
  const { markdownRemark: post } = data;
  const { title } = post.frontmatter;

  return (
    <Layout>
      <Link className="post__back space__large" to={'/'}>Back</Link>
      <article>
        <h1 className="heading__large">{title}</h1>
        <div className="body__large" dangerouslySetInnerHTML={{__html: post.html}} />
      </article>
    </Layout>
  );
}

// How to query markdownRemark to get the contents of a file
export const pageQuery = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter:  { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
      }
    }
  }
`;
