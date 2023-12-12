export default function getTokens() {
  const { token } = JSON.parse(sessionStorage.getItem("user")).state.user;

  const accessToken = token.accessToken;
  const refreshToken = token.refreshToken;

  return { accessToken, refreshToken };
}
