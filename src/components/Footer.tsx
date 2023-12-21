import Image from "next/image";

export default function Footer() {
  return (
    <footer className="h-[600px] border-y-[1px] border-primary">
      <div className="flex">
        <div className="flex h-[475px] w-1/2 flex-col gap-[35px] border-r-[1px] border-primary pl-[90px] pt-[80px]">
          <Image
            src="/Logo-ONYX.svg"
            alt="로고 아이콘"
            width={219}
            height={40}
          />
          <div>
            <h3 className="text-16 font-semibold">Address:</h3>
            <p className="text-14 font-medium">
              123 Main Street, New York, NY 1001
            </p>
          </div>
          <div>
            <h3 className="text-16 font-semibold">Contect:</h3>
            <p className="text-14 font-medium">010-1234-5678</p>
          </div>
          <div className="flex flex-row gap-[13px]">
            <Image
              src="/facebook-icon.svg"
              alt="페이스북 아이콘"
              width={24}
              height={24}
            />
            <Image
              src="/instagram-icon.svg"
              alt="인스타그램 아이콘"
              width={24}
              height={24}
            />
            <Image
              src="/twitter-icon.svg"
              alt="트위터 아이콘"
              width={24}
              height={24}
            />
            <Image
              src="/youtube-icon.svg"
              alt="유튜브 아이콘"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="h-[475px] w-1/4 border-r-[1px] border-primary pl-[85px] pt-[80px]">
          <h3 className="mb-[20px] text-16 font-semibold">고객센터</h3>
          <div className="flex flex-col gap-[8px] text-14 font-medium">
            <p>FAQ</p>
            <p>공지사항</p>
            <p>제휴문의</p>
            <p>입점상담</p>
            <p>멤버십 안내</p>
          </div>
        </div>
        <div className="pl-[85px] pt-[80px]">
          <h3 className="mb-[20px] text-16 font-semibold">회사소개</h3>
          <div className="flex flex-col gap-[8px] text-14 font-medium">
            <p>ABOUT ONYX</p>
            <p>회사소개</p>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>ESG</p>
          </div>
        </div>
      </div>
      <div className="mx-[93px] flex h-[125px] flex-row justify-between border-t-[1px] border-primary pt-[30px] text-14 font-regular">
        <div>© 2023 Perfume Trading. All rights reserved.</div>
        <div className="flex flex-row gap-[20px]">
          <p className="underline underline-offset-4">Privacy Policy</p>
          <p className="underline underline-offset-4">Terms of Use</p>
          <p className="underline underline-offset-4">Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
}
