import Layout from '../components/global/Layout'
import '../styles/globals.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Toast from 'components/global/Toast'
import { SessionProvider } from "next-auth/react"

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  


const options = {
   position: positions.BOTTOM_LEFT,
   timeout: 5000,
   offset: '1.4rem',
   transition: transitions.FADE,
}



function MyApp({ Component, session, pageProps }) {
   return (
      <SessionProvider session={session}>
         <Layout>
            <AlertProvider template={Toast} {...options}>
               <Component {...pageProps} />
            </AlertProvider>
         </Layout>
      </SessionProvider>
   )
}

export default MyApp
