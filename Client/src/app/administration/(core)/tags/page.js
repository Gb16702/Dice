import AllTags from "@/src/components/common/Global/Admin/AllTags";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import writeHead from "@/src/lib/writeHead";

const page = async () => {
    const [usersResponse, tagsResponse] = await Promise.all([
        fetch("http://localhost:8000/api/admin/users", {
            cache: "no-store",
        }),
        fetch("http://localhost:8000/api/tags", {
            cache: "no-store",
        })
    ])

    console.log(__dirname);

    const {users} = await usersResponse.json();
    const {tags} = await tagsResponse.json();

    const head = writeHead()

    return  <>
                <div>
                    <DashboardCards title="Utilisateurs" body={`${users.length <= 1 ? users.length + " Utilisateur inscrit" : users.length + " Utilisateurs inscrits"}`} />
                </div>
                <div className="flex gap-y-4 flex-col">
                    <AllTags head={head} tags={tags} />
                </div>
            </>
}

export default page;