import { Link } from "react-router-dom";
import { Folder, UserPlus, List, Zap, Book, Database } from "../../components/icons";
import Instruction from "../../components/cards/Instruction";

function Home() {
  return (
    <>
      <section className="flex md:flex-row xs:flex-col-reverse py-10 md:gap-x-20 md:my-20">
        <div className="md:w-1/2 bg-greyborder flex flex-col text-center md:h-8/12 items-center justify-center p-5">
          <h1 className="xs:font-bold md:text-5xl font-archivo">
            I want to track my expenses.
          </h1>
          <p className="md:text-2xl pt-6 font-satoshi">
            Your expenses and budget are stored in the cloud if you're a member.
          </p>
          <Link
            to="/expense"
            className="py-4 px-14 mt-14 bg-accent-400 text-white text-center md:w-fit"
          >
            Start Now, It's Free
          </Link>
        </div>
        <div className="md:w-1/2 bg-accent-400 text-center p-5 flex flex-col md:h-8/12 justify-center items-center">
          <h1 className="xs:font-bold md:text-5xl font-sans">
            I want to generate invoices.
          </h1>
          <p className="md:text-2xl pt-6">
            Generate unlimited invoices for FREE. Invoices are stored in the
            cloud for members.
          </p>
          <Link
            to="/invoice"
            className="py-4 px-14 mt-14 border-white border-solid border-2 text-white text-center md:w-fit"
          >
            Start Now, It's Free
          </Link>
        </div>
      </section>
      <section className="py-16">
        <article>
          <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-tightest md:w-[33.625rem]">
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
          <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-tightest w-[21.375rem] md:w-[33.625rem]">
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
