import { CircleX } from "../common/icons";
import { createPortal } from "react-dom";
import TransactionForm from "../Forms/TransactionForm";
import { useEffect } from "react";
import { useTransactionSubmission } from "../../features/transactions/hooks/useTransactionSubmission";

const CreateTransaction = ({
  handleClose,
  categoryInfo = null,
  partyInfo = null,
}) => {
  const { isLoading: isSubmitting, submitTransaction } =
    useTransactionSubmission(handleClose);

  useEffect(() => {
    try {
      const testKey = "_test_localStorage_";
      localStorage.setItem(testKey, "test");
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (testValue !== "test") {
        setLocalStorageAvailable(false);
        console.error("localStorage doesn't appear to be working properly");
      }
    } catch (error) {
      setLocalStorageAvailable(false);
      console.error("localStorage is not available:", error);
    }
  }, []);

  const handleSubmit = async (values) => {
    values.amount = parseFloat(values.amount);
    submitTransaction(values);
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-10 h-screen w-screen flex justify-center items-end lg:items-center z-[70]">
      <section className="w-96 lg:w-[36rem] h-fit max-h-full overflow-y-auto flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Add New Transaction
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>

        <TransactionForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          categoryInfo={categoryInfo}
          partyInfo={partyInfo}
        />
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default CreateTransaction;
