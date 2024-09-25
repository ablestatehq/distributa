import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../../../utils/currency.formatter";
import addThousandSeparators from "../../../../utils/add.thousand.separators";
import Instruction from "../../../../components/cards/Instruction";
import { Zap, Book, Database } from "../../../../components/icons";
import Button from "../../../../components/forms/Button";

function Distribute() {
  const params = useParams();

  // const [distributeId, setDistributeId] = useState(uniqueDateStringId());
  const [amount, setAmount] = useState(0);
  const [project, setProject] = useState("");
  const [
    ,
    // incomeDetails
    setIncomeDetails,
  ] = useState("");
  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [breakdown, setBreakdown] = useState([
    { name: "name", percentage: 0, amount: 0, default: true },
  ]);

  const projectField = useRef();
  const incomeAmountField = useRef();
  const incomeDetailsField = useRef();
  const nameField = useRef();
  const percentageField = useRef();
  const amountField = useRef();
  const nameFieldUpdate = useRef();
  const percentageFieldUpdate = useRef();
  const amountFieldUpdate = useRef();

  // Errors
  const incomeAmountFieldError = useRef();
  const nameFieldError = useRef();
  const percentageFieldError = useRef();
  const amountFieldError = useRef();
  const nameFieldUpdateError = useRef();
  const percentageFieldUpdateError = useRef();
  const amountFieldUpdateError = useRef();

  const isPercentageFieldDisabled = useMemo(() => {
    console.log("Change: ");
    return !(amount && nameField?.current?.value);
  }, [amount, nameField]);

  const isAmountFieldDisabled = useMemo(
    () =>
      !(amount && nameField?.current?.value && percentageField?.current?.value),
    [amount, nameField?.current?.value, percentageField]
  );

  const [disabled, setDisabled] = useState({
    nameField: !amount,
    percentageField: !(amount && nameField?.current?.value),
    amountField: !(
      amount &&
      nameField?.current.value &&
      percentageField?.current?.value
    ),
  });

  const [distributions, setDistributions] = useState(null);
  const [
    ,
    // selectedDistribution
    setSelectedDistribution,
  ] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);
    const name = nameField.current.value;
    const percentage = percentageField.current.value;
    const amount = amountField.current.value.replace(/,/g, "");
    if (name === "" || percentage === "" || amount === "") {
      setError("Please enter a name, percentage and amount!");
      return;
    }

    if (error) return;

    // const myAmount = (parseInt(percentage) / 100) * parseInt(amount);
    const myAmount = parseInt(amount);

    setBreakdown([
      ...breakdown,
      { name, percentage, amount: myAmount, received: false },
    ]);
    nameField.current.value = "";
    percentageField.current.value = "";
    amountField.current.value = "";
  };

  const submitToServer = (e) => {
    e.preventDefault();
    setError(null);
    const data = {
      project,
      total,
      totalPercentage,
      balance,
      breakdown,
    };
    console.log(data);
  };

  const calculateTotal = useCallback(() => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.amount));
    }, 0);
  }, [breakdown]);

  const calculateTotalPercentage = useCallback(() => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.percentage));
    }, 0);
  }, [breakdown]);

  const handleReset = (e) => {
    setBreakdown([]);
    setProject(null);
    setAmount(0);
    setTotal(0);
    setBalance(0);
    setError(null);
    incomeAmountField.current.value = "";
    incomeDetailsField.current.value = "";
    projectField.current.value = "";
  };

  const handleRemove = (e) => {
    setError(null);
    const index = e.target.getAttribute("data-index");
    const myBreakdown = [...breakdown];
    myBreakdown.splice(index, 1);
    setBreakdown(myBreakdown);
  };

  const handleEdit = (e) => {
    setError(null);
    setEdit(Number(e.target.getAttribute("data-edit-index")));
  };

  const handleReceived = (e) => {
    setError(null);
    const index = e.target.getAttribute("data-received-index");
    console.log(index);
    const myBreakdown = [...breakdown];
    const received = myBreakdown[index].received;
    console.log(received);
    myBreakdown[index].received = !received;
    setBreakdown(myBreakdown);
  };

  const handleSave = () => {
    setError(null);
    const index = edit;
    const myBreakdown = [...breakdown];
    const name = nameFieldUpdate.current.value;
    const percentage = percentageFieldUpdate.current.value;
    if (name === "" || percentage === "") {
      setError("Name and Percentage are required!");
      return;
    }

    myBreakdown[index].name = name;
    myBreakdown[index].percentage = percentage;
    myBreakdown[index].amount = (parseInt(percentage) / 100) * parseInt(amount);

    setBreakdown(myBreakdown);
    setEdit(null);
  };

  const handleUpdate = (index) => {
    breakdown[index].name = nameFieldUpdate.current.value;
    breakdown[index].percentage = Number(percentageFieldUpdate.current.value);
    breakdown[index].amount = Number(
      amountFieldUpdate.current.value.replace(/,/g, "")
    );
    setBreakdown([...breakdown]);
    console.log(breakdown);
    setEdit(null);
  };

  const saveToLocal = (e) => {
    e.preventDefault();
    setError(null);
    let invoicesInLocalStorage =
      JSON.parse(localStorage.getItem("distributions")) || [];

    console.log(invoicesInLocalStorage);

    invoicesInLocalStorage = [
      {
        // id: distributeId,
        project,
        amount: Number(amount),
        breakdown: [...breakdown],
        remote_id: null,
      },
      ...invoicesInLocalStorage,
    ];

    console.log(invoicesInLocalStorage);
    const newInvoices = JSON.stringify(invoicesInLocalStorage);
    localStorage.setItem("distributions", newInvoices);

    return;
    /*let data = {};

  		data[distributeId] = {
  			project,
  			total,
  			totalPercentage,
  			balance,
  			breakdown,
  			remote_id: null,
  		};

  		const newInvoices = JSON.stringify(data);
  		localStorage.setItem("invoices", newInvoices); */
  };

  const retrieveFromLocal = () => {
    const distributions = localStorage.getItem("distributions");
    if (distributions) setDistributions(JSON.parse(distributions));
    return;
  };

  const selectDistribution = useCallback(() => {
    if (params?.id && distributions?.length) {
      setSelectedDistribution(
        distributions.filter((distribution) => distribution.id === params.id)[0]
      );
    }
  }, [distributions, params.id]);

  useEffect(() => {
    const theTotal = calculateTotal();
    const totalPercentage = calculateTotalPercentage();
    if (theTotal > amount) {
      setError("Shared Amount can not to exceed Amount to be shared!");
    } else {
      setTotal(theTotal);
      setTotalPercentage(totalPercentage);
      setBalance(amount - theTotal);
    }

    retrieveFromLocal();
    selectDistribution();
  }, [
    breakdown,
    params,
    error,
    amount,
    calculateTotal,
    calculateTotalPercentage,
    selectDistribution,
  ]);

  return (
    <>
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

      <section className="py-16">
        <article>
          <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-normal w-[21.375rem] md:w-[33.625rem]">
            Expense/Budget
          </h2>
        </article>
        <section className="md:flex justify-between">
          <div className="md:w-8/12">
            <div className="flex flex-col justify-between">
              <div className="flex flex-wrap items-start gap-y-5 justify-between">
                <div className="w-[60%] flex flex-col justify-end">
                  <label className="block font-normal font-satoshi text-tiny tracking-normal">
                    Income source
                  </label>
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full placeholder-black border border-greyborder leading-100 p-4 focus:outline-none focus:border-accent"
                    type="text"
                    placeholder="Income source"
                    onChange={(e) => setProject(e.target.value)}
                  />
                </div>
                <div className="w-[34%] flex flex-col justify-end">
                  <label className="block font-normal font-satoshi text-tiny tracking-normal">
                    Amount
                  </label>
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full placeholder-black border border-greyborder leading-100 p-4 focus:outline-none focus:border-accent"
                    type="text"
                    placeholder="Amount"
                    ref={incomeAmountField}
                    onChange={(e) => {
                      let errorMessage;
                      if (!e.target.value) {
                        errorMessage = "Amount is required";
                      } else if (!Number(e.target.value.replace(/,/g, ""))) {
                        errorMessage = "Amount should be a number";
                      }

                      if (errorMessage) {
                        setAmount(0);
                        setDisabled((disabled) => ({
                          ...disabled,
                          nameField: true,
                          percentageField: true,
                          amountField: true,
                        }));
                        setError("Amount should be a number");
                        incomeAmountFieldError.current.classList.remove(
                          "hidden"
                        );
                        incomeAmountFieldError.current.textContent =
                          errorMessage;
                        incomeAmountField.current.classList.remove(
                          "border-greyborder",
                          "focus:border-accent"
                        );
                        incomeAmountField.current.classList.add(
                          "border-error",
                          "focus:border-error"
                        );
                        return;
                      }

                      setAmount(Number(e.target.value.replace(/,/g, "")));
                      incomeAmountFieldError.current.textContent = "";
                      incomeAmountFieldError.current.classList.add("hidden");
                      incomeAmountField.current.classList.remove(
                        "border-error",
                        "focus:border-error"
                      );
                      incomeAmountField.current.classList.add(
                        "border-greyborder",
                        "focus:border-accent"
                      );
                      setDisabled((disabled) => ({
                        ...disabled,
                        nameField: false,
                      }));
                      return;
                    }}
                    onKeyUp={(e) => {
                      addThousandSeparators(e.target);
                    }}
                  />
                  <p
                    ref={incomeAmountFieldError}
                    className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error hidden"
                  ></p>
                </div>
                <textarea
                  className="w-full font-normal font-satoshi text-tiny tracking-normal placeholder-black border border-greyborder leading-100 p-4 focus:outline-none focus:border-accent resize-none"
                  placeholder="Provide some details about your income source."
                  ref={incomeDetailsField}
                  rows="3"
                  onChange={(e) => setIncomeDetails(e.target.value)}
                ></textarea>
              </div>
              <br className="mt-5" />
              <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-normal w-[21.375rem] md:w-[33.625rem]">
                Expenditure/Budget info
              </h2>
              <p className="font-normal font-satoshi text-small tracking-normal">
                Provide details about expenditure or budget. Specify name,
                percentage or amount per item. Click Add Item to add more items
                or beneficiaries.
              </p>
              <br className="mt-5" />

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-b-greyborder">
                    <th className="text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100">
                      Name
                    </th>
                    <th className="text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100">
                      Percentage
                    </th>
                    <th className="text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100">
                      Amount
                    </th>
                  </tr>
                </thead>
                {breakdown.length > 0 && (
                  <tbody>
                    {breakdown.map((person, index) => {
                      return edit === index ? (
                        <tr
                          key={index.toString()}
                          className={index % 2 > 0 ? `bg-grey` : "bg-white"}
                        >
                          <td className="py-2">
                            <input
                              type="text"
                              defaultValue={person.name}
                              ref={nameFieldUpdate}
                              disabled={!amount}
                              className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder focus:border-accent outline-none p-4 placeholder-black leading-120"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              defaultValue={person.percentage}
                              ref={percentageFieldUpdate}
                              disabled={
                                !(amount && nameFieldUpdate?.current?.value)
                              }
                              onKeyUp={(e) => {
                                const { value } = e.target;
                                if (value && typeof value === "number") {
                                  amountFieldUpdate.current.value =
                                    (Number(e.target.value) / 100) * amount;
                                  addThousandSeparators(
                                    amountFieldUpdate.current
                                  );
                                }
                              }}
                              className="font-normal font-satoshi text-tiny tracking-normal w-16 p-4 border border-greyborder focus:border-accent outline-none  placeholder-black disabled:placeholder-greyborder disabled:text-greyborder leading-120"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              defaultValue={person.amount.toLocaleString()}
                              ref={amountFieldUpdate}
                              disabled={
                                !(
                                  amount &&
                                  nameFieldUpdate?.current?.value &&
                                  percentageFieldUpdate?.current?.value
                                )
                              }
                              onKeyUp={(e) => {
                                const inputValue = e.target.value.replace(
                                  /,/g,
                                  ""
                                );
                                percentageFieldUpdate.current.value =
                                  (Number(inputValue) / amount) * 100;
                                addThousandSeparators(e.target);
                              }}
                              className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder focus:border-accent disabled:placeholder-greyborder disabled:text-greyborder outline-none p-4 placeholder-black leading-120"
                            />
                          </td>
                          <td className="p-2">
                            <button
                              className="w-fit md:w-full bg-gray-200 font-bold text-accent py-4 px-6 md:px-8"
                              onClick={() => handleUpdate(index)}
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={index.toString()}
                          className={index % 2 > 0 ? `bg-grey` : "bg-white"}
                        >
                          <td className="text-left p-2 font-medium font-satoshi text-tiny tracking-normal leading-120">
                            {person.name}
                          </td>
                          <td className="text-left p-2 font-medium font-satoshi text-tiny tracking-normal leading-120">
                            {person.percentage}%
                          </td>
                          <td className="text-left p-2 font-medium font-satoshi text-tiny tracking-normal leading-120">
                            {currencyFormatter(person.amount)}
                          </td>
                          <td className="p-2">
                            <button
                              data-index={index}
                              onClick={handleRemove}
                              variant="outline-danger"
                              size="sm"
                              className="text-red-600 underline p-2 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                          <td className="p-2">
                            <button
                              data-edit-index={index}
                              onClick={handleEdit}
                              variant="outline-info"
                              className="underline p-2 cursor-pointer"
                              size="sm"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>

              <br className="mt-3" />
              <form
                className="flex xs:flex-wrap md:flex-nowrap justify-between xs:gap-y-3 md:gap-y-0"
                onSubmit={handleAdd}
              >
                <div className="md:w-[30%] xs:w-[40%]">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-4 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
                    type="text"
                    placeholder="Name"
                    ref={nameField}
                    disabled={disabled.nameField}
                    onChange={(e) => {
                      let errorMessage;
                      if (!e.target.value) {
                        errorMessage = "Name is required";
                      }
                      if (errorMessage) {
                        setError("Name should be a number");
                        setDisabled((disabled) => ({
                          ...disabled,
                          percentageField: true,
                          amountField: true,
                        }));
                        nameFieldError.current.classList.remove("hidden");
                        nameFieldError.current.textContent = errorMessage;
                        nameField.current.classList.remove(
                          "border-greyborder",
                          "focus:border-accent"
                        );
                        nameField?.current?.classList.add(
                          "border-error",
                          "focus:border-error"
                        );
                        return;
                      }

                      nameFieldError.current.textContent = "";
                      nameFieldError.current.classList.add("hidden");
                      nameField?.current?.classList.remove(
                        "border-error",
                        "focus:border-error"
                      );
                      nameField?.current?.classList.add(
                        "border-greyborder",
                        "focus:border-accent"
                      );
                      setDisabled((disabled) => ({
                        ...disabled,
                        percentageField: false,
                      }));
                      return;
                    }}
                  />
                  <p
                    ref={nameFieldError}
                    className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error hidden"
                  ></p>
                </div>
                <div className="md:w-[10%] xs:w-[20%]">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-4 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
                    type="text"
                    placeholder="%"
                    value={percentageField.value}
                    ref={percentageField}
                    disabled={disabled.percentageField}
                    onKeyUp={(e) => {
                      const value = e.target?.value ?? null;
                      const percentage = Number(value);
                      if (
                        value &&
                        percentage &&
                        amount > 0 &&
                        percentage <= 100 &&
                        percentage > 0
                      ) {
                        amountField.current.value = (percentage / 100) * amount;
                        addThousandSeparators(amountField.current);
                      }
                    }}
                    onChange={(e) => {
                      let errorMessage;
                      if (!e.target.value) {
                        errorMessage = "% is required";
                      } else if (
                        Number(e.target.value.replace(/,/g, "")) > 100
                      ) {
                        errorMessage = "% too high";
                      } else if (
                        Number(e.target.value.replace(/,/g, "")) === 0 ||
                        Number(e.target.value.replace(/,/g, "")) < 0
                      ) {
                        errorMessage = "% too low";
                      } else if (!Number(e.target.value.replace(/,/g, ""))) {
                        errorMessage = "Invalid %";
                      }

                      if (errorMessage) {
                        setError("Name should be a number");
                        setDisabled((disabled) => ({
                          ...disabled,
                          amountField: true,
                        }));
                        percentageFieldError.current.classList.remove("hidden");
                        percentageFieldError.current.textContent = errorMessage;
                        percentageField.current.classList.remove(
                          "border-greyborder",
                          "focus:border-accent"
                        );
                        percentageField?.current?.classList.add(
                          "border-error",
                          "focus:border-error"
                        );
                        return;
                      }

                      percentageFieldError.current.textContent = "";
                      percentageFieldError.current.classList.add("hidden");
                      percentageField?.current?.classList.remove(
                        "border-error",
                        "focus:border-error"
                      );
                      percentageField?.current?.classList.add(
                        "border-greyborder",
                        "focus:border-accent"
                      );
                      setDisabled((disabled) => ({
                        ...disabled,
                        amountField: false,
                      }));
                      return;
                    }}
                  />
                  <p
                    ref={percentageFieldError}
                    className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error hidden"
                  ></p>
                </div>
                <div className="md:w-[30%] xs:w-[32%]">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-4 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
                    type="text"
                    placeholder="Amount"
                    ref={amountField}
                    disabled={disabled.amountField}
                    onKeyUp={(e) => {
                      if (e.target?.value) {
                        const inputValue = e.target.value.replace(/,/g, "");
                        percentageField.current.value =
                          (Number(inputValue) / amount) * 100;

                        addThousandSeparators(e.target);
                      }
                    }}
                  />
                  <p
                    ref={amountFieldError}
                    className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error hidden"
                  ></p>
                </div>
                <Button
                  type="submit"
                  className="xs:w-46% md:w-fit bg-grey font-bold text-tiny px-8"
                  onClick={handleAdd}
                  kind="plain"
                >
                  Add Item
                </Button>
              </form>
            </div>
          </div>
          <br className="md:hidden" />
          <div className="md:w-3/12 bg-grey p-5">
            <h2 className="font-semibold py-2">Summary</h2>
            <hr className="border-solid border-b-1 border-gray-400 my-5" />
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2">Income source</td>
                  <td className="py-2 text-right">{project}</td>
                </tr>
                <tr>
                  <td className="py-2">Income</td>
                  <td className="py-2 text-right">
                    {currencyFormatter(amount)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Beneficiaries/Items</td>
                  <td className="py-2 text-right">{breakdown?.length}</td>
                </tr>
              </tbody>
            </table>
            <hr className="border-b-1 border-gray-400 my-5" />
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2">Balance</td>
                  <td className="py-2 text-right">
                    {currencyFormatter(
                      breakdown?.length === 0 ? Number(amount) : balance
                    )}
                    /{100 - totalPercentage}%
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Spent</td>
                  <td className="py-2 text-right">
                    {" "}
                    {currencyFormatter(total)} / {totalPercentage}%
                  </td>
                </tr>
              </tbody>
            </table>
            <hr className="border-solid border-b-1 border-gray-400 my-5" />
            <br className="py-10" />
            <button className="bg-accent w-full h-10 text-white">Share</button>
            <div className="flex gap-5 pt-5">
              <button
                className="w-1/2 py-2 text-red-700 border border-solid border-red-600 text-center"
                onClick={handleReset}
              >
                Reset
              </button>
              <button className="w-1/2 py-2 text-accent border border-solid border-accent text-center">
                Save
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Distribute;
