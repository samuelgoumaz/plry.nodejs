import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export const query = graphql`
  query CandidateTemplate($id: Int!) {
    strapiCandidate(strapiId: { eq: $id }) {
      biography
      character
      citation
      id
      lastname
      name
      poster {
        publicURL
      }
      video {
        publicURL
      }
      image {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const CandidateTemplate = ({ data }) => {
  return (
    <Layout>
      <section className="section section-page">

        <div className="section-inner row">
          <div className="col col-image s12 m6 l6">

            <div className="background">
              <div className="cover">
                <img alt={data.strapiCandidate.name} src={data.strapiCandidate.image.childImageSharp.fluid.src} />
              </div>
            </div>
          </div>

          <div className="col col-content s12 m6 l6">
            <video width="100%" height="auto" controls poster={data.strapiCandidate.poster.publicURL}>
              <source src={data.strapiCandidate.video.publicURL} type="video/mp4" />
              <track default kind="captions" srclang="fr" />
            </video>
            <h1>{data.strapiCandidate.name} {data.strapiCandidate.lastname}</h1>
            {data.strapiCandidate.biography && <div className="body biography text-format" dangerouslySetInnerHTML={{ __html:data.strapiCandidate.biography }} />}
            {data.strapiCandidate.citation && <div className="body citation text-format" dangerouslySetInnerHTML={{ __html:data.strapiCandidate.citation }} />}
            {data.strapiCandidate.character && <div className="body character text-format" dangerouslySetInnerHTML={{ __html:data.strapiCandidate.character }} />}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CandidateTemplate
