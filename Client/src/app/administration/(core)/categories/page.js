import AllCategories from "@/src/components/common/Global/Admin/AllCategories";
import Category from "@/src/components/common/Global/Admin/Category";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import LastRegistered from "@/src/components/common/Global/Admin/LastRegistered";
import writeHead from "@/src/lib/writeHead";

const dashboard = async () => {
    const response = await fetch("http://localhost:8000/api/admin/users", {
        cache: "no-store"
    })

    const categoriesResponse = await fetch("http://localhost:8000/api/categories", {
        cache: "no-store"
    })

    const data = await response.json()
    const {categories} = await categoriesResponse.json()


    const head = writeHead()

    return  <>
                <div>
                    <DashboardCards title="Utilisateurs" body={`${data.users.length <= 1 ? data.users.length + " Utilisateur inscrit" : data.users.length + " Utilisateurs inscrits"}`} />
                </div>
                <div className="flex gap-y-4 flex-col">
                    <div className="h-[70px] flex items-end">
                        <Category />
                    </div>
                    <AllCategories head={head} categories={categories}/>
                </div>
            </>
}

export default dashboard;