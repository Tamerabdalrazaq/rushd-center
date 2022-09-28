import React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { GrLinkNext } from 'react-icons/gr'

function BackTo({to}) {
   return (
      <Link href={"/"+to}>
         <Button variant="outlined" color="primary">
            Back to {to} <GrLinkNext />
         </Button>
      </Link>
   )
}

export default BackTo
