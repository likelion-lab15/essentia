import axios from "axios";
import { getRefreshToken } from "./_index";

export default async function fetchRefreshToken() {
  const res = await axios.get("https://localhost/api/users/refresh", {
    headers: {
      Authorization: `Bearer ${getRefreshToken()}`,
    },
  });

  const prevUserData = JSON.parse(localStorage.getItem("user"));

  const updatedUserData = {
    ...prevUserData,
    accessToken: res.data.accessToken,
  };

  localStorage.setItem("user", JSON.stringify(updatedUserData));
}
