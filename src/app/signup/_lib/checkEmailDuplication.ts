/**
 * 이메일 중복 확인
 * @param {string} email
 * @returns {Promise<boolean>} 중복되지 않으면 true, 중복되면 false 반환
 */

export default async function checkEmailDuplication(
  email: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/users/email?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log("response ok");
      /* 사용가능한 이메일인 경우 */
      return true;
    } else if (response.status === 409) {
      /* 중복된 이메일인 경우 */
      return false;
    } else {
      throw new Error("이메일 중복 확인 서버 에러");
    }
  } catch (error) {
    console.error("이메일 중복 확인 요청 중 오류가 발생했습니다.:", error);
    throw error;
  }
}
