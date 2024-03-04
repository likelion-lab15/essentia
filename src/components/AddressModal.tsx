"use client";

import DaumPostcode from "react-daum-postcode";

type TAddressModal = {
  // eslint-disable-next-line no-unused-vars
  selectedAddress: (address: string) => void;
};

type TAddressData = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
};

export default function AddressModal({ selectedAddress }: TAddressModal) {
  const handleComplete = (data: TAddressData) => {
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
    selectedAddress(fullAddress); // fullAddress => 서울시 양천구 오목로 10길 7-9
  };
  const customStyle = {
    width: "500px",
    height: "600px",
  };
  return <DaumPostcode onComplete={handleComplete} style={customStyle} />;
}
