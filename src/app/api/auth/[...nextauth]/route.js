import CredentialsProvider from "next-auth/providers/credentials";
import MongoConnect from "../../../../../config/MongoConnect";
import Users from "../../../../../model/Users";
import bcrypt from "bcryptjs";
import nextAuth from "next-auth";
export const authOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'credentials',
            credentials:{
                email:{label:'Email',type:'email'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials)
            {
                await MongoConnect();
                try {
                    const user = await Users.findOne({email:credentials.email})
                    if(user)
                    {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password,user?.password);
                        if(isPasswordCorrect)
                        {
                            return user;
                        }
                    }
                } catch (error) {
                    throw new Error(error)
                }
            },
            
        })
    ],
    callback :{
        async signIn({user,account})
        {
            if(account?.provider === 'credentials'){
                return true
            }
        }
    }
}
export const handler = nextAuth(authOptions);
export {handler as GET, handler as POST};