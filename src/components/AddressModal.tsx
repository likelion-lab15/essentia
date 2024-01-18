/* eslint-disable no-unused-vars */
"use client";

import DaumPostcode from "react-daum-postcode";

export default function AddressModal({ selectedAddress }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    selectedAddress(fullAddress);
  };
  const customStyle = {
    width: "500px",
    height: "600px",
  };
  return <DaumPostcode onComplete={handleComplete} style={customStyle} />;
}
