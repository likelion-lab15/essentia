import { getUserSession } from "@/utils/getServerSession";

export default async function UserName() {
  const user = await getUserSession();

  return (
    <>
      <span className="text-[48px] font-bold">{user.name} </span>님 환영합니다
    </>
  );
}
