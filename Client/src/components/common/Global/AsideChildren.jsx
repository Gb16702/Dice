import Link from "next/link";
import Label from "./Label";

const AsideChildren = ({ session, param, url }) => {
  return (
    <Link href={`${process.env.DEV_URL}/${session?.slug}/${param.url}`}>
      <Label url={param.url}  text={param.text} />
    </Link>
  );
};

export default AsideChildren;
