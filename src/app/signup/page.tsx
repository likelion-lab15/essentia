import SignUpForm from "./_components/SignUpForm";

export default function SignUp() {
  return (
    <main className="mb-[13px] flex h-[1500px] flex-col items-center pt-[120px]">
      <h2 className="mb-[66px] text-36 font-bold">회원가입</h2>
      <SignUpForm />
    </main>
  );
}
