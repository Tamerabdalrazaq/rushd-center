import NextAuth from 'next-auth/next'
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "utils/mongodb-nextauth"

export const authOptions = {
  providers: [
     GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: 'ZzNgztm38oJD3E36ibEMYnBItKo3wDni/Se2BYPH7k8=',
  callbacks: {
     session: async ({ session, token }) => {
       if (session?.user) {
         session.user.id = token.uid;
       }
       return session;
     },
     jwt: async ({ user, token }) => {
       if (user) {
         token.uid = user.id;
       }
       return token;
     },
   },
   session: {
     strategy: 'jwt',
   },
}

export default NextAuth(authOptions)
