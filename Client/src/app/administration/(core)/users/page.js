import GetUsers from "@/src/components/Pages/admin/Core/GetUsers";

const getUsers = async () => {
    const data = await fetch("http://localhost:8000/api/admin/getUsers")
    return data.json()
}

const users = async () => {
    const users = await getUsers()
    console.log(users.data);

    return  <>
                {users.map(user => {
                    <div>
                        <h1>Ok</h1>
                        <p>{user.username}</p>
                    </div>
                })}

            </>
}

export default users;