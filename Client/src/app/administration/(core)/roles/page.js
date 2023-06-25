import AllRoles from "@/src/components/common/Global/Admin/AllRoles";
import DashboardCards from "@/src/components/common/Global/Admin/DashboardCards";
import { decodeSession } from "@/src/lib/decodeSession";
import writeHead from "@/src/lib/writeHead";

const dashboard = async () => {

    const session = await decodeSession();
    const [rolesResponse, usersResponse] = await Promise.all([
        fetch(`http://localhost:8000/api/roles?grade=${session?.roles?.grade}`, {
            cache: "no-store",
            method: "GET",
        }),
        fetch("http://localhost:8000/api/admin/users")
      ]);

      const {roles} = await rolesResponse.json();
      const {users} = await usersResponse.json();

      const head = writeHead();

    return  <>
                <div>
                    <DashboardCards title="Utilisateurs" body={`${users.length <= 1 ? users.length + " Utilisateur inscrit" : users.length + " Utilisateurs inscrits"}`} />
                </div>
                <div className="flex gap-y-4 flex-col">
                <AllRoles head={head} roles={roles} users={users} session={session} />
                </div>
            </>
}

export default dashboard;