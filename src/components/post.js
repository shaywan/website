import React from "react";
import { Link } from "gatsby";

const Post = ({ post }) => {
  const { frontmatter } = post;

  return (
    <div className="post">
      <div className="post__details">
        <h2 className="post__title">{frontmatter.title}</h2>
        <p class="post__date">Published N days ago</p>
        <p className="post__description">{frontmatter.description.substr(0, 150)}...</p>
        <span><Link className="post__read" to={frontmatter.path}>Read the full story &rarr;</Link></span>
      </div>
    </div>
  );
};

export default Post;
