import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./reset.css";
import "./layout.css";

const Layout = ({ children }) => {
  const siteQuery = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `;

  const renderLayout = (data) => (
    <div className="wrapper">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </div>
  );

  return (
    <StaticQuery query={siteQuery} render={renderLayout} />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
