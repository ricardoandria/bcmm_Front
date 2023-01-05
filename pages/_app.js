import Layout from '../components/Layouts/Layout'
import {QueryClient,QueryClientProvider} from "react-query"
import '../styles/globals.css'

const queryClient = new QueryClient({});


function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>

  )


}

export default MyApp