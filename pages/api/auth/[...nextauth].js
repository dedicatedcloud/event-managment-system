import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name : "Credentials",
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a users or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                //console.log(credentials);
                const user = await prisma.user.findUnique({
                    where : {
                        email : req.body.email,
                    },
                });
                // console.log(await bcrypt.compare(req.body.password, user.password), "bcrypt");
                // If no error and we have users data, return it
                if(user && await bcrypt.compare(req.body.password, user.password)){
                    delete user.password;
                    return user;
                }
                // Return null if users data could not be retrieved
                return null
            }
        }),
    ],
    callbacks: {
        jwt : async ({ token, user }) => {
            if(user){
                token.user = user;
            }
            return token;
        },
        session : async ({ token, session }) => {
            if(token){
                session.user = token.user;
            }
            return session;
        },

    },
    secret : "test",
    pages : {
        signIn: '/login',
        error: '/login',
    }
})