import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'

function Index() {
    const { data: session } = useSession()
    if (session) {
      return (
         <div>
            <p>welcome{session.user.email}</p>
            <button onClick={() => {signOut()}}>sign signOut{
            }</button>
         </div>
      )
   } else {
    return (
         <div>
            <p>sign in please</p>
            <button onClick={() => signIn()}>sign in</button>
         </div>
    )

   }
}

export default Index
