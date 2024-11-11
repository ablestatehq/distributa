import { useState, Fragment, useEffect } from "react";
import { EditCategory } from "../../../../components/Modals";
import { useFetcher } from "react-router-dom";

const CategoryRow = ({ categoryData, index }) => {
  const [category, setCategory] = useState(categoryData);
  const [editCategory, setEditCategory] = useState(null);

  if (editCategory) console.log(editCategory);
  const toggleCategoryModal = (categoryId = null) =>
    setEditCategory(categoryId);

  const handleUpdateCategory = (updatedCategory) => {
    setCategory((category) => ({ ...category, ...updatedCategory }));
    setEditCategory(null);
  };

  const fetcher = useFetcher();

  useEffect(() => {
    if (
      fetcher &&
      fetcher.data?.success &&
      fetcher?.data?.data?.$id === categoryData.$id
    ) {
      setCategory((category) => ({ ...category, ...fetcher.data?.data }));
    }
  }, [fetcher.data]);

  return (
    <Fragment key={category.$id}>
      <tr className={`${index % 2 === 0 ? "bg-white" : "bg-grey"}`}>
        <td className="w-full min-w-[5.2rem] lg:min-w-[8.2rem] font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start capitalize">
          {category?.name}
        </td>
        <td className="w-auto font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start capitalize">
          {category?.type}
        </td>
        <td className="w-auto font-satoshi font-medium text-tiny leading-100 tracking-normal px-2 lg:px-4 py-3 text-start flex gap-x-2">
          <button
            type="button"
            className="font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny outline-none"
            onClick={async (event) => {
              event.stopPropagation();
              console.log("Let's invoke the deleting action here");
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
            onClick={() => {
              console.log("Let's invoke the editing action here");
              toggleCategoryModal(index);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
      {editCategory === index && (
        <EditCategory
          handleClose={toggleCategoryModal}
          category={category}
          updateCategory={handleUpdateCategory}
          fetcher={fetcher}
        />
      )}
    </Fragment>
  );
};

export default CategoryRow;
