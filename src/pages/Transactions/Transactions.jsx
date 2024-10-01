import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Book } from "../../components/common/icons";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  // TODO: use loader data to determine if there are some transactions.
  // TODO: handle loading state and display the empty state or the transactions.
  return (
    <ContentViewAreaWrapper>
      <section className="flex-1 flex flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal">
            My Transactions
          </h1>
          <hr className="invisible h-8" />
        </header>
        <div className="flex-1 flex flex-col md:flex-row-reverse md:gap-x-4">
          <div className="flex flex-col gap-y-2 md:w-1/3">
            <section className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey">
                  <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                    N/A
                  </h3>
                  <p className="font-satoshi font-regular text-tiny leading-100 tracking-normal">
                    Income this month
                  </p>
                </article>
                <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey">
                  <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                    N/A
                  </h3>
                  <p className="font-satoshi font-regular text-tiny leading-100 tracking-normal">
                    Expenses this month
                  </p>
                </article>
              </div>
              <Button
                type="button"
                className="w-full px-6 py-3 font-bold text-small"
                kind="plain"
                disabled={true}
              >
                Export PDF Report
              </Button>
              <Button
                type="button"
                className="w-full px-6 py-3 font-bold text-small"
              >
                Add New
              </Button>
            </section>
          </div>
          <hr className="invisible h-8 md:hidden" />
          <main className="flex-1 flex justify-center items-center md:w-2/3 md:bg-grey rounded-lg">
            <article className="flex flex-col items-center gap-y-4">
              <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
                <Book variation="black" />
              </div>
              <div className="flex flex-col gap-y-2">
                <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
                  No Transactions
                </h3>
                <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
                  You haven't created any transaction yet.
                </p>
              </div>
              <Button className="w-fit px-12 py-3 font-bold text-medium">
                Create Transaction
              </Button>
            </article>
          </main>
        </div>
      </section>
    </ContentViewAreaWrapper>
  );
};

export default Transactions;
