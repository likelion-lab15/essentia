import axios from "axios";
import { getRefreshToken } from "./_index";

export default async function fetchRefreshToken() {
  await axios
    .get("https://localhost/api/users/refresh", {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
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
