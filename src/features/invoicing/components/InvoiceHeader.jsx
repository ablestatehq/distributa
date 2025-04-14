import { useInvoices } from "../hooks";
import { Button } from "../../../components/common/forms";
import { InvoiceFilters } from "./InvoiceFilters";

function InvoiceHeader() {
  const { navigateToCreate, applyFilters } = useInvoices();

  return (
    <header className="flex flex-col gap-y-2">
      <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal">
        My Invoices
      </h1>
      <hr className="invisible h-8" />
      <div className="flex flex-wrap gap-2 justify-between lg:py-4">
        <InvoiceFilters />

        <Button
          type="button"
          className="w-fit h-fit px-6 py-3 font-bold text-small"
          onClick={navigateToCreate}
        >
          Create New Invoice
        </Button>
      </div>
      <hr className="invisible h-4" />
    </header>
  );
}

export default InvoiceHeader;
