import axios from "axios";
import { getTokens } from "./_index";

export default async function fetchRefreshToken() {
  const { refreshToken } = getTokens();

  await axios
    .get("https://localhost/api/users/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then((res) => {
      const newToken = res.data.accessToken;
      const userData = JSON.parse(localStorage.getItem("user"));
      userData.token.accessToken = newToken;
      localStorage.setItem("user", JSON.stringify(userData));
    })
    .catch((err) => {
      console.log(err.message);
    });
}
