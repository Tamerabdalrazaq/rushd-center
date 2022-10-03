import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsFillCalculatorFill, BsTable } from 'react-icons/bs'
import { TbVocabulary } from 'react-icons/tb'
import navstyle from 'styles/navbar.module.css'

function SideOption({ route, text, toggle }) {
   const router = useRouter()
   const icons = {
      calculator: <BsFillCalculatorFill />,
      myscores: <BsTable />,
      vocabulary: <TbVocabulary />,
   }
   return (
      <div className={navstyle.sidemenu_option}>
         <Link href={`/${route}`}>
            <a onClick={() => toggle(false)}>
               {icons[route]}
               {text}
            </a>
         </Link>
      </div>
   )
}

export default SideOption
