import navstyle from 'styles/navbar.module.css'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

function NavOption({ route, text }) {
    const router = useRouter()
    const navchild = useRef(`${navstyle.navchild} ${navstyle.ccter}`)
   return (
      <Link href={`/${route}`}>
         <a
            className={`${navstyle.secondry_child} ${navchild.current} ${
               router.route === `/${route}` ? navstyle.selected : ''
            }`}
         >
            {text}
         </a>
      </Link>
   )
}

export default NavOption
