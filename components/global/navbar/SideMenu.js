import Image from 'next/image'
import { navOptions } from 'data/ui'
import { FaArrowRight } from 'react-icons/fa'
import navstyle from 'styles/navbar.module.css'
import { ImExit, ImEnter } from 'react-icons/im'
import SideOption from './SideOption'
import { motion } from 'framer-motion'
import Loading from '../Loading'
import { signIn, signOut } from 'next-auth/react'

function SideMenu({ session, loading, toggle }) {
   return (
      <>
         <motion.div
            animate={{ x: 0 }}
            initial={{ x: 100 }}
            className={navstyle.side_menu}
         >
            <div className={navstyle.sidemenu_content}>
               {!loading ? (
                  <div className={navstyle.sidemenu_header}>
                     <div className={navstyle.sidemenu_header_right + ' ccter'}>
                        {session ? <ImExit onClick={signOut} />:<ImEnter onClick={signIn} /> }
                     </div>
                     <div className={navstyle.sidemenu_header_left}>
                        {session ? (
                           <>
                              <h4>{session.user.name}</h4>
                              <div className={navstyle.sidemenu_imagewrapper}>
                                 <Image
                                    className={navstyle.sidemenu_profile_image}
                                    height="50"
                                    width="50"
                                    src={session.user.image}
                                 />
                              </div>
                           </>
                        ) : (
                           <h4>Sign In</h4>
                        )}
                     </div>
                  </div>
               ) : 'test'}
               <div className={navstyle.sidemenu_navOptions}>
                  {navOptions.map((opt) => (
                     <SideOption
                        text={opt.text}
                        route={opt.route}
                        toggle={toggle}
                        key={opt.route}
                     />
                  ))}
               </div>
               <FaArrowRight
                  onClick={() => toggle(false)}
                  className={navstyle.sidemenu_backArrow}
               />
            </div>
         </motion.div>
         <div
            className={navstyle.sidemenu_shader_div}
            onClick={() => toggle(false)}
         ></div>
      </>
   )
}

export default SideMenu
