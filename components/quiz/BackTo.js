import React from 'react'
import Link from 'next/link'
import { GrLinkNext } from 'react-icons/gr'
import Button from 'components/global/Button'

function BackTo({ to, type, component }) {
   return (
      <Link href={'/' + to}>
         {type == 'text' ? (
            <Button >
               Back to {to} <GrLinkNext />
            </Button>
         ) : (
            component
         )}
      </Link>
   )
}

export default BackTo
