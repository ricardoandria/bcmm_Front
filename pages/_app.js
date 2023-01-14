import Layout from '../components/Layouts/Layout'
import {QueryClient,QueryClientProvider} from "react-query"
import '../styles/globals.css'
import Login from "./Login"
import { useState } from 'react';

const queryClient = new QueryClient({});


function MyApp({ Component, pageProps }) {
  const [who,setWho] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
    {who ? <Layout>
         <Component {...pageProps} />
      </Layout> : <Login display={setWho} />}  
      

    </QueryClientProvider>

  )


}

export default MyApp
