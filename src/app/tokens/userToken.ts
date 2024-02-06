// 세션스토리지에서 엑세스 토큰 불러오기
const getAccessToken = () => {
  const accessTokenString = sessionStorage.getItem("token");
  if (accessTokenString) {
    const tokenData = JSON.parse(accessTokenString);
    return tokenData.state.token
      ? tokenData.state.token.accessToken
      : "access Token을 찾을 찾을 수 없습니다";
  }
};

// 세션스토리지에서 유저 토큰 불러오기
const getUserToken = () => {
  const userTokenString = sessionStorage.getItem("user");
  if (userTokenString) {
    const userTokenData = JSON.parse(userTokenString);
    return userTokenData.state.user
      ? userTokenData.state.user._id
      : "userToken을 찾을 수 없습니다";
  }
};

export default function userTokens() {
  const accessToken = getAccessToken();
  const userToken = getUserToken();
  return { accessToken, userToken };
}
