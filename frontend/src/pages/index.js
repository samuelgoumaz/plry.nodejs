
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Helmet } from "react-helmet"
/*import ScrollReveal from "scrollreveal"*/

export const query = graphql`
  query strapiHomepage {
    allStrapiCandidate {
      edges {
        node {
          id
          biography
          character
          citation
          strapiId
          lastname
          name
          image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    strapiHomepage {
      claim
      download {
        id
        title
        id
        document {
          publicURL
        }
      }
      section {
        id
        title
        body
        axe
        exemple
        conclusion
        id
        argument {
          id
          icon
          label
          value
        }
      }
      banner {
        childImageSharp {
          fluid(maxWidth: 1650) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
const slideRight = {
  distance: '150%',
  origin: 'right'
}
const slideLeft = {
  distance: '-150%',
  origin: 'right'
}
const IndexPage = ({ data }) => {

  useEffect(() => {
    /*
    ScrollReveal({ reset: true }).reveal('.section-banner', slideLeft);
    ScrollReveal({ reset: true }).reveal('.section-candidates', slideRight);
    ScrollReveal({ reset: true }).reveal('.section-introduction', slideLeft);
    ScrollReveal({ reset: true }).reveal('.section-chapter', slideRight);
    */

  }, [])
  return (
    <Layout>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Homepage | PLR Yverdon</title>
        {/**<link rel="icon" href={favicon} />**/}
      </Helmet>


      <section className="section section-banner">
        <div className="background">
          <div className="cover">
            <img alt="banner" src={data.strapiHomepage.banner.childImageSharp.fluid.src} />
          </div>
        </div>
        <div className="section-inner row">
          <div className="col col-content s9 m9 l9">
            <h1 className="title"><span>
              Le PLR s'engage pour faire<br />d'Yverdon-les-bains<br />une ville <i className="material-icons">add_circle</i> forte</span>
            </h1>
          </div>
          <div className="col col-files s3 m3 l3">
            <ul className="files">
              {data.strapiHomepage.download.map(
                (item) =>
                <li key={`download-`+item.id} className="item">
                  <a href={item.document.publicURL} target="_blank" rel="noreferrer">
                    <i className="material-icons">insert_drive_file</i>{item.title}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-candidates">
        <div className="section-inner row">
          {data.allStrapiCandidate.edges.map(
            (item) =>
            <AniLink key={`candidate-`+item.node.id} paintDrip to={"candidate/"+item.node.strapiId} color="white">
              <div className="candidate">
                <div className="inner">
                  <div className="background">
                    <div className="cover">
                      <img alt={item.node.name} src={item.node.image.childImageSharp.fluid.src} />
                    </div>
                  </div>
                  <div className="content">
                    <h2 className="title">{item.node.name} {item.node.lastname}</h2>
                  </div>
                </div>
              </div>
            </AniLink>
          )}
        </div>
      </section>

      <section className="section section-introduction">
        <div className="section-inner">
          {data.strapiHomepage.claim && <div className="body text-format" dangerouslySetInnerHTML={{ __html:data.strapiHomepage.claim }} />}
        </div>
      </section>

      {data.strapiHomepage.section.map(
        (item) =>
        <section key={`section-`+item.id} className="section section-chapter" id={`chapter`+item.id}>
          <div className="section-inner">
            {item.body && <h3 className="title">{item.title}</h3>}
            <div className="content">
              {item.body && <div className="body principal text-format" dangerouslySetInnerHTML={{ __html:item.body }} />}
              {item.axe && <div className="body axe text-format" dangerouslySetInnerHTML={{ __html:item.axe }} />}
              {item.exemple && <div className="body example text-format" dangerouslySetInnerHTML={{ __html:item.exemple }} />}
              {item.conclusion && <div className="body conclusion text-format" dangerouslySetInnerHTML={{ __html:item.conclusion }} />}
            </div>
          </div>
        </section>
      )}

    </Layout>
  )
}

export default IndexPage
