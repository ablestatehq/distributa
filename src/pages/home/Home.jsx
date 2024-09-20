import { Link } from "react-router-dom";
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
      <section className="py-10">
        <article>
          <h2 className="text-3xl font-sans">
            Generate and Share <br className="xs:hidden" />
            Invoices In 3 Simple Steps
          </h2>
        </article>
        <div className="grid md:grid-cols-3 gap-6 mt-6 xs:grid-cols-1">
          <article className="bg-gray-200 p-5 rounded">
            <img src="Icon1.png.png" alt="folder" />
            <h3 className="py-4 text-xl font-bold">Income details</h3>
            <p>Add the amount you earned.</p>
          </article>
          <article className="bg-gray-200 pt-4 pl-4 pb-5 rounded">
            <img src="Icon2.png.png" alt="beneficiary" />
            <h3 className="py-4 text-xl font-bold">Beneficiaries</h3>
            <p>
              Enter the Name and Percentage/Amount of each person. <br />
              Made a mistake? No worries you can edit or delete.
            </p>
          </article>
          <article className="bg-gray-200 pt-4 pl-4 pb-5 rounded">
            <img src="Icon3.png.png" alt="breakdown" />
            <h3 className="py-4 text-xl font-bold">Breakdown</h3>
            <p>
              See the break down of the amount. Click Restart to
              <br />
              start a fresh.
            </p>
          </article>
        </div>
      </section>
      <section className="py-10">
        <article>
          <h2 className="text-3xl font-sans">
            Track your <br className="xs:hidden" />
            Money
          </h2>
        </article>
        <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-6 mt-6">
          <article className="bg-gray-200 p-6 rounded">
            <img src="Icon4.png.png" alt="finance" />
            <h3 className="py-4 text-xl font-bold">
              Improve Your Financial Health
            </h3>
            <p>
              Awareness <br className="hidden" />
              Understand and take informed decisions about{" "}
              <br className="hidden" />
              your spending habits.
            </p>
          </article>

          <article className="bg-gray-200 p-6 rounded">
            <img src="Icon5.png.png" alt="budget" />
            <h3 className="py-4 text-xl font-bold">Budgeting Assitance</h3>
            <p>
              Create and stick to a budget by showing your
              <br className="hidden" />
              spending and indetifying areas of overspending.
            </p>
          </article>

          <article className="bg-gray-200 p-6 rounded">
            <img src="Icon6.png.png" alt="savings" />
            <h3 className="py-4 text-xl font-bold">Saving Money</h3>
            <p>
              Indentify and cut unnecessary expenses to save{" "}
              <br className="hidden" />
              money.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Home;
