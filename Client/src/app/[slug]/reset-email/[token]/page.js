import jwt from "jsonwebtoken";
import { decodeSession } from "@/src/lib/decodeSession";
import { redirect } from "next/navigation";
import ResetEmailForm from "@/src/components/common/Global/Forms/ResetEmailForm";
import { FormEnglober } from "@/src/components/common/Global/FormEnglober";

const decodeToken = async (token) => {
  try {
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    console.log(decodedToken);
    return decodedToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const page = async (req, res) => {
  const { slug, token } = req.params;

  const verifyToken = await decodeToken(token);
  const session = await decodeSession();

  if(!session) {
      return redirect("/")
  }

  console.log(verifyToken, "test");

  if (!verifyToken || !session) {
    return redirect("/");
  }

  const expiration = new Date(verifyToken.exp * 1000).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit"});
  const now = new Date().toLocaleDateString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(now, "test");
  console.log(expiration, "test");


  if (expiration < now) {
    await fetch(`/api/users/${session?.id}/token`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token : session?.user?.passwordToken }),
    })

    return redirect("/");
  }

  if (verifyToken.id !== session.id) {
    return redirect("/");
  }

  return (
    <section className="h-[100vh] flex items-center justify-center bg-gradient-to-b from-[#F7F7F7] to-[#EEE] relative">
      <div className="flex items-center justify-center flex-col w-[1000px]">
        <div className="w-[330px] flex items-center flex-col">
          <FormEnglober>
            <h1 className="font-semibold text-[26px] py-[5px] text-zinc-700/[.80] pb-[30px]">
              Modifie ton adresse mail
            </h1>
            <ResetEmailForm />
          </FormEnglober>
        </div>
      </div>
    </section>
  );
};
export default page;
