const Page = ({ children, pageNumber, totalPages }) => (
  <div className="w-[595px] h-[842px] border border-black m-5 p-12 flex flex-col gap-y-12 relative">
    {children}
    <div className="absolute bottom-4 right-4 text-xs">
      Page {pageNumber} of {totalPages}
    </div>
  </div>
);

export default Page;
