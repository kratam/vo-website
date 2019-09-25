import wrapWithProvider from './src/layout/top-wrapper'

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
