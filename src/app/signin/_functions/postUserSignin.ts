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

    return res.data.item;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}
