import { Suspense, useState } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { Button } from "../../components/common/forms";
import { CreateCategory } from "../../components/Modals";
import { CategoryRow } from "../../features/settings/components";
import { Category } from "../../components/common/icons";

const CategorySettings = () => {
  const data = useLoaderData();

  const [createCategory, setCreateCategory] = useState(false);

  const toggleCreateCategory = () => setCreateCategory((prev) => !prev);

  return (
    <section className="flex h-full w-full flex-col gap-y-2">
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
                    <div className="h-4 bg-grey rounded w-20"></div>
                  </th>
                  <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                    <div className="h-4 bg-grey rounded w-20"></div>
                  </th>
                  <th className="w-auto lg:min-w-[8.2rem] font-satoshi font-normal text-tiny lg:text-small leading-100 tracking-normal px-2 lg:px-4 pb-2 text-start">
                    <div className="h-4 bg-grey rounded w-20"></div>
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
            return data?.length > 0 ? (
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
            ) : (
              <section className="w-full h-full flex items-center justify-center">
                <article className="flex flex-col items-center gap-y-4 w-full max-w-md">
                  <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
                    <Category />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
                      No Categories
                    </h3>
                    <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
                      You haven't created any category yet.
                    </p>
                  </div>
                  <Button
                    className="w-fit px-12 py-3 font-bold text-medium"
                    onClick={toggleCreateCategory}
                  >
                    Create New Category
                  </Button>
                </article>
              </section>
            );
          }}
        </Await>
      </Suspense>
      {createCategory && <CreateCategory handleClose={toggleCreateCategory} />}
    </section>
  );
};

export default CategorySettings;
