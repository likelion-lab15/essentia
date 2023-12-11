/* RefreshToken 받아오기 */

export default function getRefreshToken() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user")).token.refreshToken;
  } else {
    console.log("refresh 토큰을 찾을 수가 없습니다!");
  }
}
