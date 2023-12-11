import FilterList from "@/components/FilterList";
import Products from "./_components/Products";
import Filter from "@/containers/Filter";
import brandList from "@/constants/brandList";

export default function AllProducts() {
  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex h-[400px] items-center justify-center">
          <h1 className=" w-[900px] border-b-[5px] border-black text-center text-50 font-bold">
            LE LABO
          </h1>
        </div>
        <section className="flex gap-[30px]">
          <Filter title="Brand">
            <FilterList list={brandList} />
          </Filter>
          <Products />
        </section>
      </main>
    </>
  );
}
