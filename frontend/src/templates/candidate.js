import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query CandidateTemplate($id: Int!) {
    strapiCandidate(strapiId: { eq: $id }) {
      strapiId
      name
    }
  }
`

const CandidateTemplate = ({ data }) => {
  const article = data.strapiCandidate
  return (
    <Layout>
      <h1>{data.strapiCandidate.name}</h1>
    </Layout>
  )
}

export default ArticleTemplate
