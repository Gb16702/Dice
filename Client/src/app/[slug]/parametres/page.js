import Aside from "@/src/components/common/Global/Aside";
import { decodeSession } from "@/src/lib/decodeSession";

const page = async () => {
    const session = await decodeSession();

    return  <Aside session={session}>
                        {session?.username}
                </Aside>
}

export default page;
