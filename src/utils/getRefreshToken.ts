/* RefreshToken 받아오기 */

export default function getRefreshToken() {
  return JSON.parse(localStorage.getItem("user")).token.refreshToken;
}
