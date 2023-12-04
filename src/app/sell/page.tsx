export default function Sell() {
  return (
    <section className="flex flex-col items-center">
      <div className="flex h-[180px] items-center justify-center">
        <h2 className="w-[900px] text-center text-36 font-bold">
          판매 상품 등록
        </h2>
      </div>

      <form className="w-[1200px]">
        <div className="border-tertiary h-[138px] border-b-[1px]">
          <label htmlFor="name" className="mr-[100px] text-18 font-bold">
            상품명
          </label>
          <input
            type="text"
            name="name"
            className="border-primary w-[745px] border-b-[5px]"
          />
        </div>
        <div className="border-tertiary h-[138px] border-b-[1px] pt-[50px]">
          <label htmlFor="amount" className="mr-[100px] text-18 font-bold">
            향수 용량
          </label>
          <select name="amount" id="amount" className="w-[300px]">
            <option value="50ml">50ml</option>
            <option value="100ml">100ml</option>
          </select>
        </div>
        <div className="border-tertiary h-[280px] border-b-[1px] pt-[50px]">
          <label htmlFor="file" className="mr-[100px] text-18 font-bold">
            상품이미지
          </label>
          <input type="file" name="file" accept="image/*" required />
        </div>
        <div className="border-tertiary relative h-[195px] border-b-[1px] pt-[50px]">
          <label htmlFor="restamount" className="mr-[100px] text-18 font-bold">
            남은 용량
          </label>
          <input
            type="text"
            name="restamount"
            placeholder="ml"
            className="border-primary w-[250px] border-b-[2px] pl-[230px]"
          />
          <label
            htmlFor="price"
            className="ml-[120px] mr-[100px] text-18 font-bold"
          >
            가격
          </label>
          <input
            type="number"
            name="price"
            placeholder="원"
            className="border-primary mr-[270px] w-[250px] border-b-[2px] pl-[220px]"
          />
          <label
            htmlFor="date"
            className="absolute left-0 top-[120px] mr-[100px] text-18 font-bold"
          >
            구매 일시
          </label>
          <input
            type="date"
            name="date"
            className="border-primary absolute left-[165px] top-[120px] w-[250px] border-b-[2px]"
          />
        </div>
        <div className="border-tertiary relative h-[320px] border-b-[1px] pt-[50px]">
          <label
            htmlFor="description"
            className="absolute top-[50px] text-18 font-bold"
          >
            설명
          </label>
          <textarea
            name="description"
            id="text"
            cols={100}
            rows={8}
            placeholder="제품의 상태 (사용감, 하자 유무) 등을 입력해 주세요."
            className="border-tertiary absolute left-[100px] border-[1px] pl-[16px] pt-[16px]"
          ></textarea>
        </div>
        <div className="mt-[90px] flex h-[195px] flex-row justify-center gap-[16px]">
          <button className="border-primary h-[48px] w-[322px] border-[1px]">
            임시저장
          </button>
          <button className="bg-primary h-[48px] w-[322px] text-white">
            등록하기
          </button>
        </div>
      </form>
    </section>
  );
}
