import React from "react"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import data from '../data/joke.json';

const IndexPage = () => (
  <div>
    <p>{data.value}</p>
  </div>
)

export default IndexPage
