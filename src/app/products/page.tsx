import Products from "./_components/Products";

export default function AllProducts() {
  return (
    <main>
      <div className="flex h-[200px] w-[1280px] flex-col items-center justify-center">
        <h1 className="text-50 mb-11 w-[900px] border-b-[5px] border-black text-center font-bold">
          LE LABO
        </h1>
      </div>
      <Products />
    </main>
  );
}
