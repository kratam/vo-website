import React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
// import BackgroundImage from 'gatsby-background-image'
import './background.css'

const Background = ({ children }) => {
  return <div className="main-bg">{children}</div>
}

// const Background = ({ children }) => {
//   const localData = useStaticQuery(graphql`
//     query BackgroundQuery {
//       bg: file(relativePath: { eq: "book-bg.jpg" }) {
//         childImageSharp {
//           fluid(maxWidth: 1920, quality: 90) {
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//     }
//   `)
//   return (
//     <BackgroundImage
//       Tag="section"
//       style={{
//         width: '100%',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//       }}
//       fluid={localData.bg.childImageSharp.fluid}
//       backgroundColor="#efefef"
//     >
//       {children}
//     </BackgroundImage>
//   )
// }

export default Background
