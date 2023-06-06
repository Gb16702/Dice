"use client";

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
                console.log(credentials);
                try {
                const res = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                })

                const {userWithoutPassword : {_id : id, username, email, roles}} = await res.json();
                return {id, username, email, roles}
            }
            catch(e) {
                console.log(e);
                throw new Error(e.message ?? "Une erreur est survenue")
            }
        }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if(trigger === "update") {
                return {...token, ...session.user}
            }
            return {...token, ...user}
        },

        async session({ session, token }) {
          session.user = token;
          return session;
        },

        async redirect() {
            return "/"
        }

      },
}
