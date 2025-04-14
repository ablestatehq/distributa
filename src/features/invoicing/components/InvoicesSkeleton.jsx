function InvoicesSkeleton() {
  return (
    <div className="h-full w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b border-b-grey">
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start"></th>
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
            <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
              <div className="h-4 bg-grey rounded w-20"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-20"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-32"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-16"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-24"></div>
              </td>
              <td className="px-2 lg:px-4 py-4">
                <div className="h-4 bg-grey rounded w-20"></div>
              </td>
              <th className="w-auto min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start flex gap-x-2">
                <div className="h-4 bg-grey rounded w-10"></div>
                <div className="h-4 bg-grey rounded w-10"></div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesSkeleton;
