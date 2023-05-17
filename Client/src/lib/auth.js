import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials"
import { getGoogleCredentials, getDiscordCredentials } from "./getProvidersCredentials"

export const authOptions = {
    session : {
        strategy : "jwt",
    },
    pages : {
        signIn: "/connexion",
    },
    providers : [
        GoogleProvider({
            clientId : getGoogleCredentials().clientId,
            clientSecret : getGoogleCredentials().clientSecret
        }),
        DiscordProvider({
            clientId : getDiscordCredentials().clientId,
            clientSecret : getDiscordCredentials().clientSecret
        }),
        CredentialsProvider({
            async authorize(credentials) {


            }
        })
    ],
    callbacks : {

        redirect() {
            return "/";
        }
    }
}