import Navbar from './Navbar'
import { StatsProvider } from '../../context/UserStats'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'


function Layout({ children }) {
   const router = useRouter()
   return (
      <>
         <Head>
            <title>Rushd Center | مركز رُشد</title>
            <meta name="apple-mobile-web-app-capable" content="yes" />
         </Head>
         <StatsProvider> 
            {!(NO_NAV_ROUTES.includes(router.pathname)) && <Navbar />}
            {children}
          </StatsProvider>
      </>
   )
}

export default Layout


const NO_NAV_ROUTES = ['/vocabulary/practice']