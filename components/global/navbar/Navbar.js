import navstyle from 'styles/navbar.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { navOptions } from 'data/ui'
import NavOption from './NavOption'
import SideMenu from './SideMenu'

function Navbar() {
   const router = useRouter()
   const [menuToggled, setMenuToggled] = useState(false)
   const navchild = useRef(`${navstyle.navchild} ${navstyle.ccter}`)
   const { data: session, status } = useSession()
   const loading = status === 'loading'
   return (
      <>
         <nav className={navstyle.nav}>
            <div className={navstyle.wrapper}>
               <div className={navstyle.container}>
                  <div className={navstyle.hamburger_menu}>
                     <GiHamburgerMenu onClick={() => setMenuToggled(!menuToggled)} />
                  </div>
                  <div className={`${navstyle.right} ${navstyle.ccter}`}>
                     <div
                        className={[navstyle.navtitle, navstyle.ccter].join(
                           ' '
                        )}
                     >
                        مركز رُشْد
                     </div>
                     {navOptions.map((opt) => (
                        <NavOption key={opt.route} route={opt.route} text={opt.text} />
                     ))}
                  </div>

                  <div className={[navstyle.left, navstyle.ccter].join(' ')}>
                     <Link
                        href={`/api/auth/${!session ? 'signin' : 'signout'}`}
                     >
                        <a
                           className={` ${navstyle.secondry_child} ${navstyle.navchild} ${navstyle.ccter}`}
                           style={{ fontWeight: 'bold' }}
                           onClick={(e) => {
                              e.preventDefault()
                              if (!session && !loading) return signIn()
                              if (session) return signOut()
                           }}
                        >
                           {(() =>
                              session
                                 ? 'Sign Out'
                                 : loading
                                 ? 'Loading ...'
                                 : 'Sign In')()}
                        </a>
                     </Link>
                     <h3
                        className={`${navstyle.secondry_child}`}
                        style={{ fontWeight: '500' }}
                     >
                        {session ? 'Signed in as  ' + session.user.name : ''}
                     </h3>
                  </div>
               </div>
            </div>
         </nav>
         {menuToggled && (
            <SideMenu
               session={session}
               loading={loading}
               toggle={setMenuToggled}
            />
         )}
      </>
   )
}

export default Navbar
