import navstyle from '../../styles/navbar.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/dist/client/router'
import { useRef } from 'react'

function Navbar() {
   const router = useRouter()
   const navchild = useRef(`${navstyle.navchild} ${navstyle.ccter}`)
   const { data: session, status } = useSession()
   const loading = (status === 'loading')
   return (
      <nav className={navstyle.nav}>
         <div className={navstyle.wrapper}>
            <div className={navstyle.container}>
               <div className={`${navstyle.right} ${navstyle.ccter}`}>
                  <div
                     className={[navstyle.navtitle, navstyle.ccter].join(' ')}
                  >
                     مركز رُشْد
                  </div>
                  <Link href="/calculator">
                     <a
                        className={`${navchild.current} ${
                           router.route === '/calculator'
                              ? navstyle.selected
                              : ''
                        }`}
                     >
                        الحاسبة
                     </a>
                  </Link>
                  <Link href="/myscores">
                     <a
                        className={`${navchild.current} ${
                           router.route === '/myscores' ? navstyle.selected : ''
                        }`}
                     >
                        علاماتي
                     </a>
                  </Link>
                  <Link href="/vocabulary">
                     <a
                        className={`${navchild.current} ${
                           router.route === '/vocabulary'
                              ? navstyle.selected
                              : ''
                        }`}
                     >
                        Vocabulary
                     </a>
                  </Link>
               </div>

               <div className={[navstyle.left, navstyle.ccter].join(' ')}>
                  <Link href={`/api/auth/${(!session) ? 'signin' : 'signout'}`}>
                     <a className={`${navstyle.navchild} ${navstyle.ccter}`} onClick={(e) => {
                        e.preventDefault();
                        if(!session && !loading) return signIn()
                        if(session) return signOut()
                     }}>
                        {(!session) ? 'signin' : 'signout'}
                     </a>
                  </Link>
               </div>

            </div>
         </div>
      </nav>
   )
}

export default Navbar
