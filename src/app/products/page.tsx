import Products from "./_components/Products";

export default function AllProducts() {
  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex h-[200px] items-center justify-center">
          <h1 className="mb-11 w-[900px] border-b-[5px] border-black text-center text-50 font-bold">
            LE LABO
          </h1>
        </div>
        <Products />
      </main>
    </>
  );
}
