export default function Filter() {
  const list = ["전체보기", "구매내역", "판매내역", "관심상품", "리뷰"];

  return (
    <div className="w-[250px]">
      <p className="h-[70px] cursor-default border-b-[3px] border-solid border-[#222] text-[36px] font-bold">
        MY PAGE
      </p>
      <div>
        <p className="flex h-[46px] cursor-default items-center px-[25px] font-semibold">
          쇼핑 정보
        </p>
        <ul className="mb-[20px]">
          {list.map((item, index) => {
            return (
              <li
                key={index}
                className="flex h-[36px] cursor-pointer items-center px-[25px] font-medium text-[#808080] hover:bg-[#A0D1EF] hover:text-[#222]"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="flex h-[46px] cursor-default items-center px-[25px] font-semibold">
          쇼핑 정보
        </p>
        <ul className="mb-[20px]">
          {list.map((item, index) => {
            return (
              <li
                key={index}
                className="flex h-[36px] cursor-pointer items-center px-[25px] font-medium text-[#808080] hover:bg-[#A0D1EF] hover:text-[#222]"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
