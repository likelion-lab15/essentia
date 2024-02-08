import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function getUserSession() {
  const session = await getServerSession(authOptions);

  if (session) {
    return session.user.item;
  } else {
    return null;
  }
}
