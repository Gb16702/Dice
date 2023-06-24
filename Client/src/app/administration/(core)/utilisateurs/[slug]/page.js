import DeleteAccount from "@/src/components/common/Global/Admin/DeleteAccount";
import Trash from "@/src/components/common/Global/Admin/Trash";
import Cross from "@/src/components/common/Global/Icons/HeroIcons/admin/Cross";
import Image from "next/image";
import Link from "next/link";

const page = async (req) => {
    const response = await fetch(`http://localhost:8000/api/admin/users/${req.params.slug}`, {
        cache: "no-store",
    })
    const data = await response.json()

    return (
            <div className="w-full h-[250px] bg-zinc-800 rounded-md">
                <div className="pt-[20px] px-[12px] flex flex-row gap-x-4 relative">
                    <div className="absolute right-5 top-5 flex flex-row gap-x-3">
                    <DeleteAccount user={data} />
                    <Link href="/administration/utilisateurs">
                        <Cross className=" w-5 h-5 stroke-zinc-200" />
                    </Link>
                    </div>
                    {data.user.avatar && (
                        <Image
                            src={data.user.avatar}
                            alt={`Avatar de ${data.user.name}`}
                            width={90}
                            height={90}
                            className="rounded-full w-[80px] h-[80px]"
                        />
                        )}
                    <div className="flex flex-row relative top-2">
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-zinc-100 tracking-tight font-medium">{data.user.username + " - inscrit depuis le " + new Date(data.user.createdAt).toLocaleDateString("fr-FR",{
                                year : "numeric",
                                month : "long",
                                day : "numeric"
                        })}</h1>
                            <small className="text-zinc-400">{data.user.email}</small>
                            <small className="text-zinc-400">{data.user.roles.name}</small>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
    )

}


export default page