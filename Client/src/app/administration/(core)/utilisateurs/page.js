import AllUsers from "@/src/components/common/Global/Admin/AllUsers";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import Searchbar from "@/src/components/common/Global/Admin/Searchbar";
import { search } from "@/src/lib/search";

const page = async ({searchParams}) => {

    const queryParams = new URLSearchParams(searchParams);
    const response = await fetch(`http://localhost:8000/api/admin/users?${queryParams}`, {
      cache: "no-store",
    })
    const data = await response.json()

    const head = ["Utilisateur", "Adresse mail", "Inscrit il y a", "Actions"]

    return (
      <>
        <div>
          <DashboardCards
            title="Utilisateurs"
            body={`${
              data.users.length <= 1
                ? data.users.length + " Utilisateur inscrit"
                : data.users.length + " Utilisateurs inscrits"
            }`}
          />
        </div>
        <div className="flex gap-y-4 flex-col">
          <AllUsers users={data.paginatedUsers} head={head} totalPage={data.totalPages} initialPage={searchParams} />
        </div>
      </>
    );
}

export default page;