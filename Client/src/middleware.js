import { NextResponse as res } from "next/server"
import { getToken } from "next-auth/jwt"

export {default} from "next-auth/middleware"

export const middleware = async (req) => {

     const session = await getToken({
         req,
         secret: process.env.NEXTAUTH_SECRET
     })

     const requestedPage = req.nextUrl.pathname
     const url = req.nextUrl.clone()

     let message, customErrorCookie;

     url.pathname = "/error";
     url.search = `request=${requestedPage}`;

     if (!session)
         if (req.nextUrl.pathname.startsWith("/profil") || req.nextUrl.pathname.startsWith("/admin")) {
             message = "Tu dois être connecté pour accéder à cette page"
             customErrorCookie = res.next().cookies.set("errorMessage", message)
             return res.redirect(url, {
                 headers: {
                     "Set-Cookie": customErrorCookie,
                 }
             })
         }

     if (session) {
         if (req.nextUrl.pathname.startsWith("/connexion") || req.nextUrl.pathname.startsWith("/inscription")) {
             message = "Tu es déjà connecté"
             customErrorCookie = res.next().cookies.set("errorMessage", message)
             return res.redirect(url, {
                 headers: {
                     "Set-Cookie": customErrorCookie,
                 },
             });
         }
         if (req.nextUrl.pathname.startsWith("/admin") && (req.nextUrl.pathname != "/administration/authentification")) {
            console.log(session, "session")
             if (session?.roles.grade > 2) {
                 message = "Tu n'es pas autorisé à accéder à cette page"
                 customErrorCookie = res.next().cookies.set("errorMessage", message)
                 return res.redirect(url, {
                     headers: {
                         "Set-Cookie": customErrorCookie,
                     },
                 });
             } else {
                    if(!session?.adminToken) {
                        return res.redirect("http://localhost:3000/administration/authentification")
                }
             }
         } else if (req.nextUrl.pathname == "/administration/authentification" && session?.adminToken) {
                return res.redirect("http://localhost:3000/administration/dashboard")
         }
    }

    return res.next();
}