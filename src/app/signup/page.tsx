"use client";

export default function SignUp() {
  return (
    <main>
      <h2>회원가입</h2>

      <form action="/">
        {/* 이메일 주소 */}
        <label htmlFor="email">
          로그인에 사용할 이메일 주소를 입력해주세요
        </label>
        <input
          id="email"
          type="email"
          aria-errormessage="emailError"
          aria-invalid={!isEmailValid}
          placeholder="example@essentia.co.kr"
        />
        {/* 이메일 오류 경고창 */}
        <div id="emailError" aria-live="polite">
          이메일 오류 메세지
        </div>

        {/* 비밀번호 */}
        <label htmlFor="password">사용할 비밀번호를 입력해주세요</label>
        <input
          id="password"
          type="password"
          aria-errormessage="passwordError"
          aria-invalid={!isPasswordValid}
          placeholder="영문 대/소문자, 숫자 및 특수문자를 포함한 비밀번호"
        />
        <input
          id="passwordCheck"
          type="password"
          aria-errormessage="passwordError"
          placeholder="비밀번호 확인"
        />
        {/* 비밀번호 오류 경고창 */}
        <div id="passwordError" aria-live="polite">
          비밀번호 오류 메세지
        </div>

        {/* 이름 & 휴대폰번호 */}
        <label htmlFor="name">이름과 휴대폰 번호를 입력해주세요</label>
        <input
          id="name"
          type="text"
          aria-errormessage="nameError"
          placeholder="이름"
        />
        <div id="nameError" aria-live="polite">
          이름 오류 메세지
        </div>
        <label htmlFor="phone"></label>
        <input
          id="phone"
          type="tel"
          aria-errormessage="phoneError"
          placeholder="휴대폰 번호('_')제외"
        />
        {/* 휴대폰번호 오류 경고창*/}
        <div id="phoneError" aria-live="polite">
          휴대폰 번호 오류 메세지
        </div>

        {/* 생년월일 */}
        <label htmlFor="birth">생년월일을 입력해주세요</label>
        <input
          id="birth"
          type="date"
          aria-errormessage="birthError"
          placeholder="예) 19990707"
        />
        {/* 생년월일 오류 경고창*/}
        <div id="birthError" aria-live="polite">
          생년월일 오류 메세지
        </div>

        {/* 주소 */}
        <label htmlFor="address">주소를 입력해주세요</label>
        <input
          id="address"
          type="text"
          aria-errormessage="addressError"
          placeholder="도로명 주소를 입력해주세요"
        />
        <button type="button">주소 검색</button>
        <label htmlFor="addressDetail"></label>
        <input
          id="addressDetail"
          type="text"
          aria-errormessage="addressError"
          placeholder="상세 주소를 입력해주세요"
        />
        {/* 주소 오류 경고창*/}
        <div id="addressError" aria-live="polite">
          주소 오류 메세지
        </div>

        <button type="submit">회원가입 완료</button>
      </form>
    </main>
  );
}
