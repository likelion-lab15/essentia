export default function SellForm() {
  const errorMessage = "100원 이상 입력해주세요.";

  return (
    <form className="w-[1200px]">
      {/* 상품 정보 가져오기 - 브랜드, 상품명, 용량 */}
      <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary">
        <label htmlFor="name" className="text-18 font-bold">
          브랜드
        </label>
        <span className="ml-[85px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
          Aesop
        </span>
      </div>
      <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary pb-[50px]">
        <label htmlFor="name" className="text-18 font-bold">
          상품명
        </label>
        <span className="ml-[85px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
          Tacit Eau De Perfume
        </span>
      </div>
      <div className="mt-[50px] h-[138px] border-b-[1px] border-tertiary pb-[50px]">
        <label htmlFor="name" className="text-18 font-bold">
          용량
        </label>
        <span className="ml-[102px] inline-block w-[745px] border-b-[5px] border-primary text-32 font-semibold">
          50 ml
        </span>
      </div>
      <div className="h-[280px] border-b-[1px] border-tertiary pt-[50px]">
        <label htmlFor="file" className="mr-[100px] text-18 font-bold">
          상품이미지
        </label>
        <input type="file" name="file" accept="image/*" multiple />
      </div>

      {/* 남은 용량 */}
      <div className="pt-[50px]">
        <label htmlFor="restamount" className="text-18 font-bold">
          남은 용량
        </label>
        <input
          type="number"
          name="restamount"
          placeholder="ml"
          className="ml-[35px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {errorMessage !== null && (
          <div
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {errorMessage}
          </div>
        )}
      </div>
      {/* 가격 */}
      <div className="pt-[30px]">
        <label htmlFor="price" className="text-18 font-bold">
          가격
        </label>
        <input
          type="number"
          name="price"
          placeholder="원"
          className="ml-[70px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {errorMessage !== null && (
          <div
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {errorMessage}
          </div>
        )}
      </div>
      {/* 구매 일시 */}
      <div className="border-b-[1px] border-tertiary pb-[50px] pt-[30px]">
        <label htmlFor="date" className="text-18 font-bold">
          구매 일시
        </label>
        <input
          type="date"
          name="date"
          className="ml-[35px] mt-[20px] w-[250px] border-b-[2px] border-primary"
        />
        {errorMessage !== null && (
          <div
            aria-live="polite"
            className="ml-[100px] flex h-[30px] w-full items-center text-warning"
          >
            {errorMessage}
          </div>
        )}
      </div>
      {/* 설명 */}
      <div className="relative h-[320px] border-b-[1px] border-tertiary pt-[50px]">
        <label
          htmlFor="content"
          className="absolute top-[50px] text-18 font-bold"
        >
          설명
        </label>
        <textarea
          name="content"
          id="text"
          cols={100}
          rows={8}
          placeholder="제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요."
          className="absolute left-[100px] border-[1px] border-tertiary pl-[16px] pt-[16px]"
        ></textarea>
      </div>
      {/* 등록 버튼 */}
      <div className="mt-[90px] flex h-[195px] flex-row justify-center gap-[16px]">
        <button className="h-[48px] w-[322px] bg-primary text-white">
          등록하기
        </button>
      </div>
    </form>
  );
}
