import Quiz from 'components/quiz/Quiz'
import styles from 'styles/practice.module.css'
import { unstable_getServerSession } from 'next-auth'
import { getUserData } from 'utils/api/client_api'
import { authOptions } from 'pages/api/auth/[...nextauth]'

function Practice({ session, userLists, categorizedWords, globalLists, categorizedLists }) {
   return (
      <div style={{ direction: 'ltr' }} className={`${styles.page} ccter`}>
         <Quiz
            data={{
               session,
               userLists,
               categorizedWords,
               categorizedLists,
               globalLists,
            }}
         />
      </div>
   )
}

export async function getServerSideProps(context) {
   const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
   )
   if (!session)
      return {
         props: {
            session,
         },
      }
   else {
      const data = await getUserData(session)
      const { userLists, categorizedWords, globalLists, categorizedLists } = data
      return {
         props: {
            session,
            userLists,
            categorizedWords,
            categorizedLists,
            globalLists,
         },
      }
   }
}

export default Practice
