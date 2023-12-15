"use client";

import { useState, useEffect } from "react";

export default function UserName() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userName = JSON.parse(user).state.user.name;
      setUserName(userName);
    }
  }, []);

  return (
    <>
      <span className="text-[48px] font-bold">{userName} </span>님 환영합니다
    </>
  );
}
