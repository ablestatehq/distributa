import { Suspense, useState } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { Button } from "../../components/common/forms";
import { CreateCategory } from "../../components/Modals";
import { CategoryRow } from "../../features/settings/components";

const CategorySettings = () => {
  const data = useLoaderData();

  const [createCategory, setCreateCategory] = useState(false);

  const toggleCreateCategory = () => setCreateCategory((prev) => !prev);

  return (
    <section className="flex flex-col gap-y-2">
      <header className="flex flex-col items-end gap-y-2 w-full">
        <hr className=" h-4 text-red-300" />
        <Button
          type="button"
          className="w-fit px-6 py-3 font-bold text-small"
          onClick={toggleCreateCategory}
        >
          Create Category
        </Button>
        <hr className="invisible h-4" />
      </header>
      <Suspense
        fallback={
          <div className="h-full w-full overflow-x-auto animate-pulse">
            <table className="min-w-full table-fixed">
              <thead>
                <tr className="border-b border-b-grey">
                  <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                    Name
                  </th>
                  <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                    Flow Type
                  </th>
                  <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index} className="">
                    <td className="px-2 lg:px-4 py-4">
                      <div className="h-4 bg-grey rounded w-3/4"></div>
                    </td>
                    <td className="px-2 lg:px-4 py-4">
                      <div className="h-4 bg-grey rounded w-20"></div>
                    </td>
                    <td className="px-2 lg:px-4 py-4">
                      <div className="flex gap-2">
                        <div className="h-6 w-8 bg-grey rounded"></div>
                        <div className="h-6 w-8 bg-grey rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      >
        <Await resolve={data?.categories}>
          {(data) => {
            return (
              <div className="h-full w-full overflow-x-auto">
                <table className="min-w-full table-fixed">
                  <thead>
                    <tr className="border-b border-b-greyborder">
                      <th className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                        Name
                      </th>
                      <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                        Flow Type
                      </th>
                      <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((category, index) => (
                      <CategoryRow
                        categoryData={category}
                        key={category.$id}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </Await>
      </Suspense>
      {createCategory && <CreateCategory handleClose={toggleCreateCategory} />}
    </section>
  );
};

export default CategorySettings;
