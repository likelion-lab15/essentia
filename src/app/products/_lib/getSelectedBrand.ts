export async function getSelectedBrand(selectedBrand: string) {
  // custom 파라미터에 JSON 객체를 문자열로 변환하여 포함
  const customFilter = encodeURIComponent(
    JSON.stringify({
      "extra.brand": selectedBrand,
    })
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}products?custom=${customFilter}`
  );
  if (!res.ok) {
    throw new Error("Failed to 상품 데이터 fetch");
  }
  const data = await res.json();
  return data.item;
}
