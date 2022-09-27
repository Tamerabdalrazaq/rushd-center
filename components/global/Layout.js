import Navbar from './Navbar'
import { StatsProvider } from '../../context/UserStats'
import Head from 'next/head'

function Layout({ children }) {
   return (
      <>
         <Head>
            <title>Rushd Center | مركز رُشد</title>
            <meta name="apple-mobile-web-app-capable" content="yes" />
         </Head>
         <StatsProvider> 
            <Navbar />
            {children}
          </StatsProvider>
      </>
   )
}

export default Layout
