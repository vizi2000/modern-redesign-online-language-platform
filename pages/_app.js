import '../src/styles/index.css'
import '../src/styles/App.css'
import Layout from '../src/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp