"use server";

import { fetchPrivateData } from "@/fetch/fetch";
import { getUserSession } from "@/utils/getServerSession";

export default async function action(formData: FormData) {
  const user = await getUserSession();
  const { phone, newPassword, address, detailAddress } =
    Object.fromEntries(formData);

  const newUserData = {
    ...user,
    phone: phone,
    password: newPassword,
    extra: {
      ...user.extra,
      addressBook: {
        value: address,
        detail: detailAddress,
      },
    },
  };

  try {
    await fetchPrivateData(`users/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(newUserData),
    });
    console.log("회원정보를 수정했습니다!");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
