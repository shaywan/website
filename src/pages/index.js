import React from "react";
import { graphql } from "gatsby";
import Post from '../components/post';
// import Img from "gatsby-image";

import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  const listStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  return (
    <Layout>
      <div>
        <ul className="posts" style={listStyles}>
          {
            data.allMarkdownRemark.edges.map(edge => {
              const { node: post } = edge;

              return (
                <li key={post.id}>
                  <Post post={post} />
                </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      filter: {
        frontmatter:{
          published: {
            eq: true
          }
        }
      }
      sort: {
        fields: frontmatter___date
        order: DESC
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            description
            thumbnail
            date
          }
        }
      }
    }
  }
`;
