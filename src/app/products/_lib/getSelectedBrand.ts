export async function getSelectedBrand(selectedBrand: string) {
  // custom 파라미터에 JSON 객체를 문자열로 변환하여 포함
  const customFilter = encodeURIComponent(
    JSON.stringify({
      "extra.brand": selectedBrand,
    })
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/products?custom=${customFilter}`
  );
  if (!res.ok) {
    throw new Error("Failed to 상품 데이터 fetch");
  }
  const data = await res.json();
  return data.item;
}

export async function getPageData(page: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/products?page=${page}&limit=12`
  );
  if (!res.ok) {
    throw new Error("Failed to 상품 데이터 fetch");
  }
  const data = await res.json();
  return data.item;
}

// export async function fetchProductsWithFilters(selectedBrand, page) {
//   const params = new URLSearchParams({
//     page: page.toString(),
//     limit: "12",
//   });

//   // 선택된 브랜드가 유효한 경우에만 custom 파라미터 추가
//   if (selectedBrand && selectedBrand.trim() !== "") {
//     const customFilter = JSON.stringify({ "extra.brand": selectedBrand });

//     params.append("custom", customFilter);
//   }

//   const queryString = params.toString();
//   const url = `${process.env.NEXT_PUBLIC_API_SERVER}/products?${queryString}`;

//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error("Failed to fetch product data");
//   }
//   const data = await res.json();
//   return data.item;
// }
