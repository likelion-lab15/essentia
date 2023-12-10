/* 로컬스토리지에 저장된 사용자의 accessToken 값을 가져온다 */

export default function getAccessToken() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user")).token.accessToken;
  }
}