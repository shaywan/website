import React from "react";
import { Link, graphql } from "gatsby";
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
      <div style={{ maxWidth: `1000px`, marginBottom: `1.45rem` }}>
        <ul style={listStyles}>
          {
            data.allMarkdownRemark.edges.map(edge => {
              const { node } = edge;

              return (
                <li key={node.id} style={{ margiBottom: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', paddingBottom: '10px', marginBottom: '20px', borderBottom: '1px solid #dfdfdf' }}>
                    <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                    <span style={{ color: '#888' }}>{new Date(node.frontmatter.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '20px' }}>
                    <img style={{ display: 'inline-block', maxWidth: '100px' }} src={node.frontmatter.thumbnail} alt="" />
                    <p>{node.frontmatter.description}</p>
                  </div>
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
