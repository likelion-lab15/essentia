export default async function getWishList(accessToken: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/bookmarks`, {
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
