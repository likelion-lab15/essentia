import { getAccessToken } from "@/utils/getServerSession";

/* accessToken이 필요없는 fetch 통신 */
export const fetchData = async (url: string, options?: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/${url}`, {
      ...options,
    });

    if (!res.ok) {
      throw new Error("HTTP 요청을 실패했습니다!");
    }

    const data = await res.json();

    return data.item;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

/* accessToken이 필요한 fetch 통신 */
export const fetchPrivateData = async (url: string, options?: any) => {
  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("HTTP 요청을 실패했습니다!");
    }

    const data = await res.json();

    return data.item;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
