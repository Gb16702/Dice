import Aside from "@/src/components/common/Global/Aside";
import { decodeSession } from "@/src/lib/decodeSession";

const page = async () => {
    const session = await decodeSession();

    console.log(session);


    return  <Aside session={session}>
                        {session?.username}
                </Aside>
}

export default page;
