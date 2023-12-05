export default function Filter({ title, children }) {
  return (
    <div className="mr-[20px] w-[250px]">
      <p className="flex h-[70px] cursor-default items-center border-b-[3px] border-solid border-[#222] text-[36px] font-bold">
        {title}
      </p>
      {children}
    </div>
  );
}
