/* 찜 제거하기 */
export default async function deleteWish(id: number, accessToken: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/bookmarks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return `${id} 상품이 제거됐습니다!`;
  } catch (error) {
    console.error("message:", error);
  }
}
