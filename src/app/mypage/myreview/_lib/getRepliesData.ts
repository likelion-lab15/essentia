import { getAccessToken } from "@/utils/getServerSession";

export default async function getRepliesData() {
  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/replies`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.item;
  } catch (error) {
    console.error("message:", error);
  }
}
