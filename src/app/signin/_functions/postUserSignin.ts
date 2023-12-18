import axios from "@/api/axios";

type TpostUserSignin = {
  email: string;
  password: string;
};

export default async function postUserSignin({
  email,
  password,
}: TpostUserSignin) {
  try {
    const res = await axios.post("users/login", {
      email: email,
      password: password,
    });

    // user 정보와 token 정보를 분리
    const { token, ...user } = res.data.item;

    return { token, user };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
