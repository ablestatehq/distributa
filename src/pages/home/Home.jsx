import { useNavigate } from "react-router-dom";
import {
  Folder,
  UserPlus,
  List,
  Zap,
  Book,
  Database,
} from "../../components/icons";
import Instruction from "../../components/cards/Instruction";
import Button from "../../components/forms/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex md:flex-row xs:flex-col-reverse py-10 md:my-20">
        <div className="md:w-1/2 bg-grey flex flex-col text-center items-center justify-center p-5 gap-y-4">
          <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal capitalize">
            I want to track my expenses.
          </h1>
          <p className="font-satoshi font-normal text-small md:text-large leading-150 tracking-normal">
            Your expenses and budget are stored in the cloud if you're a member.
          </p>
          <Button
            type="button"
            className="font-bold px-5 md:px-16 py-[0.625rem] md:py-5 mt-4 font-satoshi text-large leading-100"
            onClick={() => navigate("/expense")}
          >
            Start Now, It's Free
          </Button>
        </div>
        <div className="md:w-1/2 bg-accent/90 flex flex-col text-center items-center justify-center py-16 gap-y-4">
          <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal capitalize">
            I want to generate invoices.
          </h1>
          <p className="font-satoshi font-normal text-small md:text-large leading-150 tracking-normal">
            Generate unlimited invoices for FREE. Invoices are store in the
            cloud for members.
          </p>
          <Button
            type="button"
            className="font-bold px-5 md:px-16 py-[0.625rem] md:py-5 mt-4 font-satoshi text-large leading-100"
            onClick={() => navigate("/invoice")}
            kind="plain"
          >
            Start Now, It's Free
          </Button>
        </div>
      </section>
      <section className="py-16">
        <article>
          <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-normal md:w-[33.625rem]">
            Generate and Share Invoices In 3 Simple Steps
          </h2>
        </article>
        <section className="grid md:grid-cols-3 gap-8 mt-6 xs:grid-cols-1">
          <Instruction
            icon={<Folder />}
            title="Initiate Pool"
            description="Add the amount you want to share."
          />
          <Instruction
            icon={<UserPlus />}
            title="Beneficiaries"
            description="Enter the Name and Percentage of each person. Made a mistake? No worries you can edit or delete."
          />
          <Instruction
            icon={<List />}
            title="Breakdown"
            description="Enter the Name and Percentage of each person. Made a mistake? No worries you can edit or delete."
          />
        </section>
      </section>
      <section className="py-16">
        <article>
          <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-normal w-[21.375rem] md:w-[33.625rem]">
            Use Our Expense Tracker To
          </h2>
        </article>
        <section className="grid md:grid-cols-3 xs:grid-cols-1 gap-6 mt-6">
          <Instruction
            icon={<Zap />}
            title="Improve Your Financial Awareness"
            description="Understand and make informed decisions about your spending habits"
          />
          <Instruction
            icon={<Book />}
            title="Budgeting Assitance"
            description="Create and stick to a budget by showing your spending and identifying areas of overspending."
          />
          <Instruction
            icon={<Database />}
            title="Saving money"
            description="Identify and cut unnecessary expenses to save money."
          />
        </section>
      </section>
    </>
  );
}

export default Home;
