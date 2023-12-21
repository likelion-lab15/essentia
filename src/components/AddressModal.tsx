/* eslint-disable no-unused-vars */
"use client";

import DaumPostcode from "react-daum-postcode";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (data: any) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSelectAddress,
}: AddressModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded bg-transparent p-2 text-black hover:bg-gray-200"
        >
          Close
        </button>
        <DaumPostcode
          onComplete={(data) => {
            onSelectAddress(data);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
