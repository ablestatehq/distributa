import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { FileText } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";

function Invoices() {
  // TODO: use loader data to determine there are some invoices.
  // TODO: handle loading state and display the empty state.
  const navigate = useNavigate();
  const handleCreateNewInvoice = () => {
    navigate("/invoices/new");
  };

  return (
    <ContentViewAreaWrapper>
      <section className="flex flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl leading-110 tracking-normal">
            My Invoices
          </h1>
          <hr className="invisible h-8" />
          <div className="flex justify-end">
            <Button
              type="button"
              className="w-fit px-6 py-3 font-bold text-medium"
              onClick={handleCreateNewInvoice}
            >
              Create New Invoice
            </Button>
          </div>
          <hr className="invisible h-4" />
        </header>
      </section>
      <div className="flex-1 flex justify-center items-center">
        <article className="flex flex-col items-center gap-y-4">
          <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
            <FileText variation="black" />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
              No Invoices
            </h3>
            <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
              You haven't created any invoice yet.
            </p>
          </div>
          <Button
            className="w-fit px-12 py-3 font-bold text-medium"
            onClick={handleCreateNewInvoice}
          >
            Create New Invoice
          </Button>
        </article>
      </div>
    </ContentViewAreaWrapper>
  );
}

export default Invoices;
