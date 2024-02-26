import { UserForm } from "./_components/_index";

export default function EditUserInfo() {
  return (
    <section className="w-[1000px]">
      {/* 1. 제목 */}
      <div className="mb-[40px] flex h-[70px] items-center border-b-[3px] border-[#222]">
        <p className="text-[28px] font-bold">회원정보 수정</p>
      </div>
      {/* 2. 회원정보 */}
      <UserForm />
      {/* 주소 모달창 */}
    </section>
  );
}
