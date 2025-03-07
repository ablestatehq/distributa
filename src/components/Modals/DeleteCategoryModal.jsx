import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import { useNavigation, useSubmit } from "react-router-dom";
import { useEffect, useCallback } from "react";

const DeleteCategoryModal = ({ handleClose, category }) => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const handleDelete = useCallback(
    () =>
      submit(
        {},
        {
          method: "Delete",
          action: `/settings/categories/${category.$id}/delete`,
          encType: "application/json",
        }
      ),
    []
  );

  useEffect(() => {
    if (
      navigation.state === "loading" &&
      navigation.json != null &&
      navigation.formAction !== navigation.pathname
    ) {
      handleClose();
    }
  }, [navigation]);

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Warning
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <p className="py-4 px-16 bg-white font-satoshi font-normal text-tiny outline-none leading-140 tracking-0 resize-none">
          Are you sure you want to delete this category? <br /> This action
          cannot be undone.
        </p>
        <footer className="flex justify-end gap-x-4 p-2 bg-grey">
          <Button
            type="button"
            kind="secondary"
            className="font-bold text-small px-3"
            disabled={navigation.state === "submitting"}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="font-bold text-small px-3"
            disabled={navigation.state === "submitting"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </footer>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default DeleteCategoryModal;
