import FilterList from "@/components/FilterList";
import Products from "./_components/Products";
import Filter from "@/containers/Filter";
import brandList from "@/constants/brandList";
import ScrollTopButton from "@/components/ScrollTopButton";
import Pagination from "./_components/Pagination";

export default async function AllProducts({
  searchParams,
}: {
  searchParams: any;
}) {
  const selectedBrand = searchParams[""];
  // console.log(searchParams.page);
  const page = searchParams.page;

  return (
    <>
      <ScrollTopButton />
      <main className="mb-[150px] flex flex-col items-center">
        <div className="flex h-[300px] items-center justify-center">
          <h1 className="w-[900px] border-b-[5px] border-black text-center text-50 font-bold">
            {selectedBrand || "ALL"}
          </h1>
        </div>
        <section className="flex gap-[30px]">
          <Filter title="Brand">
            <FilterList list={brandList} />
          </Filter>
          <Products selectedBrand={selectedBrand} page={page} />
        </section>
        {/* <Pagination page={page} /> */}
      </main>
    </>
  );
}
