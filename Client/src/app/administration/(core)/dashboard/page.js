import Category from "@/src/components/common/Global/Admin/Category";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import LastRegistered from "@/src/components/common/Global/Admin/LastRegistered";

const dashboard = async () => {
    const response = await fetch("http://localhost:8000/api/admin/users", {
        cache: "no-store"
    })
    const data = await response.json()
    const sortedDataByData = data.users.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    }).slice(0, 5)



    const head = ["Utilisateur", "Adresse mail", "Inscrit il y a", "Actions"]

    return  <>
                <div>
                    <DashboardCards title="Utilisateurs" body={`${data.users.length <= 1 ? data.users.length + " Utilisateur inscrit" : data.users.length + " Utilisateurs inscrits"}`} />
                </div>
                <div className="flex gap-y-4 flex-col">
                    <div className="h-[70px] flex items-end">
                        <Category />
                    </div>
                    <LastRegistered users={sortedDataByData} head={head} />
                </div>
            </>
}

export default dashboard;