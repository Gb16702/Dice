// "use client"

// import { useEffect, useState } from "react";
// import { set } from "react-hook-form";


// const Users = () => {

//     const [users, setUsers] = useState(null)

//     useEffect(() => {
//         fetch("http://localhost:8000/api/admin/getUsers")
//         .then(res => {
//             return res.json()
//         })
//         .then(data => {
//             console.log(data)
//             setUsers(data)
//             return data
//         })
//         .catch(err => console.log(err))
//     }, [])

//     return <>
//     {users && <h1>Ok</h1>}
//     Oui
//     </>

// }

// export default Users