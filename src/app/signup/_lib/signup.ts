import { fetchData } from "@/fetch/fetch";

/**
 * 회원가입 요청
 * @param {object} userData 사용자 데이터
 * @returns {Promise<void>}
 */
export default async function signUp(userData: {
  email: string;
  password: string;
  name: string;
  phone: string;
  birth: string;
}): Promise<void> {
  try {
    await fetchData("users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("회원가입 요청 완료");
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    throw error;
  }
}
