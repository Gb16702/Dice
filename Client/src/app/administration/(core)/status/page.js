import AllStatus from "@/src/components/common/Global/Admin/AllStatus";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import writeHead from "@/src/lib/writeHead";

const dashboard = async () => {
    const [statusResponse, usersResponse] = await Promise.all([
        fetch("http://localhost:8000/api/status", {
            cache: "no-store",
        }),
        fetch("http://localhost:8000/api/admin/users")
      ]);
     
      const {status} = await statusResponse.json();
      const {users} = await usersResponse.json();

      const head = writeHead()

    return  <>
                <div>
                    <DashboardCards title="Utilisateurs" body={`${users.length <= 1 ? users.length + " Utilisateur inscrit" : users.length + " Utilisateurs inscrits"}`} />
                </div>
                <div className="flex gap-y-4 flex-col">
                    <AllStatus head={head} status={status} />
                </div>
            </>
}

export default dashboard;