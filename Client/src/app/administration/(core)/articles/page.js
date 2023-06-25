import AllArticles from "@/src/components/common/Global/Admin/AllArticles";
import Category from "@/src/components/common/Global/Admin/Category";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import { decodeSession } from "@/src/lib/decodeSession";
import writeHead from "@/src/lib/writeHead";

const page = async () => {

    const response = await fetch("http://localhost:8000/api/admin/users", {
        cache: "no-store"
    })

    const tagsResponse = await fetch("http://localhost:8000/api/tags", {
        cache: "no-store"
    })

    const data = await response.json()
    const {tags} = await tagsResponse.json()
    console.log(tags);

    const head = writeHead()
    const session = await decodeSession()


    return <>
    <div>
        <DashboardCards title="Utilisateurs" body={`${data.users.length <= 1 ? data.users.length + " Utilisateur inscrit" : data.users.length + " Utilisateurs inscrits"}`} />
    </div>
    <div className="flex gap-y-4 flex-col">
        <div className="h-[70px] flex items-end">
            <Category />
        </div>
        <AllArticles head={head} session={session} tags={tags} />
    </div>
</>
}

export default page;