import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../../../utils/currency.formatter";
import addThousandSeparators from "../../../../utils/add.thousand.separators";
import Instruction from "../../../../components/cards/Instruction";
import { Zap, Book, Database } from "../../../../components/common/icons";
import Button from "../../../../components/common/forms/Button";
import cn from "../../../../utils/cn";

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

  const [disabled, setDisabled] = useState({
    nameField: !amount,
    percentageField: !(amount && nameField?.current?.value),
    amountField: !(
      amount &&
      nameField?.current.value &&
      percentageField?.current?.value
    ),
    nameFieldUpdate: !balance,
    percentageFieldUpdate: !(amount && nameFieldUpdate?.current?.value),
    amountFieldUpdate: !(
      balance &&
      nameFieldUpdate?.current?.value &&
      percentageFieldUpdate?.current?.value
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
    const myAmount = parseInt(amount);

    setBreakdown([
      ...breakdown,
      { name, percentage, amount: myAmount, received: false },
    ]);
    nameField.current.value = "";
    percentageField.current.value = "";
    amountField.current.value = "";
    setDisabled((disabled) => ({
      ...disabled,
      percentageField: true,
      amountField: true,
    }));
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
                    className="font-normal font-satoshi text-tiny tracking-normal w-full placeholder-black border border-greyborder leading-100 p-3 focus:outline-none focus:border-accent"
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
                    className="font-normal font-satoshi text-tiny tracking-normal w-full placeholder-black border border-greyborder leading-100 p-3 focus:outline-none focus:border-accent"
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
                  className="w-full font-normal font-satoshi text-tiny tracking-normal placeholder-black border border-greyborder leading-100 p-3 focus:outline-none focus:border-accent resize-none"
                  placeholder="Provide some details about your income source."
                  ref={incomeDetailsField}
                  rows="3"
                  onChange={(e) => setIncomeDetails(e.target.value)}
                ></textarea>
              </div>
              <br className="mt-4" />
              <h2 className="font-archivo font-normal text-[1.75rem] md:text-3xl leading-120 tracking-normal w-[21.375rem] md:w-[33.625rem]">
                Expenditure/Budget info
              </h2>
              <p className="font-normal font-satoshi text-tiny tracking-normal">
                Provide details about expenditure or budget. Specify name,
                percentage or amount per item. Click Add Item to add more items
                or beneficiaries.
              </p>
              <br className="mt-5" />

              <table className="w-full text-sm table-auto">
                <thead className="w-full">
                  <tr
                    className={`border-b-2 border-b-greyborder ${cn({
                      "grid grid-cols-6 gap-x-1": edit !== null,
                      "grid grid-cols-10 md:grid-cols-8 gap-x-2": edit === null,
                    })}`}
                  >
                    <th
                      className={`text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100 ${cn(
                        {
                          "col-span-2": edit !== null,
                          "col-span-3": edit === null,
                        }
                      )}`}
                    >
                      Name
                    </th>
                    <th
                      className={`text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100 ${cn(
                        {
                          "col-span-1": edit !== null,
                          "col-span-2 md:col-span-1": edit === null,
                        }
                      )}`}
                    >
                      Percentage
                    </th>
                    <th
                      className={`text-left p-2 font-normal font-satoshi text-tiny tracking-normal leading-100 col-span-2`}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {breakdown.length > 0 &&
                    breakdown.map((person, index) => {
                      return edit === index ? (
                        <tr
                          key={index.toString()}
                          className={`grid grid-cols-6 gap-x-2 ${cn({
                            "bg-grey": index % 2 > 0,
                            "bg-white": index % 2 === 0,
                          })}`}
                        >
                          <td className="py-2 col-span-2">
                            <input
                              type="text"
                              defaultValue={person.name}
                              ref={nameFieldUpdate}
                              disabled={!amount}
                              className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder focus:border-accent outline-none p-2 placeholder-black leading-120"
                            />
                          </td>
                          <td className="py-2 col-span-1">
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
                              className="font-normal font-satoshi text-tiny tracking-normal w-full p-2 border border-greyborder focus:border-accent outline-none  placeholder-black disabled:placeholder-greyborder disabled:text-greyborder leading-120"
                            />
                          </td>
                          <td className="py-2 col-span-2">
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
                              className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder focus:border-accent disabled:placeholder-greyborder disabled:text-greyborder outline-none p-2 placeholder-black leading-120"
                            />
                          </td>
                          <td className="py-2 col-span-1">
                            <Button
                              kind="plain"
                              onClick={() => handleUpdate(index)}
                              className="text-tiny md:text-small md:py-2.5 font-medium w-full"
                            >
                              Save
                            </Button>
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={index.toString()}
                          className={`grid grid-cols-8 gap-x-2 ${cn({
                            "bg-grey": index % 2 > 0,
                            "bg-white": index % 2 === 0,
                          })}`}
                        >
                          <td className="p-2 font-medium font-satoshi text-tiny tracking-normal leading-120 col-span-3 flex items-center">
                            {person.name}
                          </td>
                          <td className="p-2 font-medium font-satoshi text-tiny tracking-normal leading-120 col-span-1 flex items-center">
                            {person.percentage}%
                          </td>
                          <td className="p-2 font-medium font-satoshi text-tiny tracking-normal leading-120 col-span-2 flex items-center">
                            {currencyFormatter(person.amount)}
                          </td>
                          <td className="p-2 col-span-1 text-start">
                            <button
                              data-index={index}
                              onClick={handleRemove}
                              variant="outline-danger"
                              size="sm"
                              className="text-error underline p-2 font-satoshi text-tiny font-normal tracking-normal leading-100"
                            >
                              Delete
                            </button>
                          </td>
                          <td className="py-2 col-span-1 text-start">
                            <button
                              data-edit-index={index}
                              onClick={handleEdit}
                              variant="outline-info"
                              className="text-black underline p-2 font-satoshi text-tiny font-normal tracking-normal leading-100"
                              size="sm"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <br className="mt-3" />
              <form
                className="grid grid-cols-10 md:grid-cols-8 gap-x-2 gap-y-3"
                onSubmit={handleAdd}
              >
                <div className="col-span-4 md:col-span-3">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-2 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
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
                <div className="col-span-2 md:col-span-1">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-2 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
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
                        percentage > 0 &&
                        percentage <= (balance / amount) * 100
                      ) {
                        amountField.current.value = (percentage / 100) * amount;
                        addThousandSeparators(amountField.current);
                        return;
                      }

                      amountField.current.value = 0;
                    }}
                    onChange={(e) => {
                      let errorMessage;
                      if (!e.target.value) {
                        errorMessage = "% is required";
                      } else if (
                        Number(e.target.value.replace(/,/g, "")) >
                        (balance / amount) * 100
                      ) {
                        errorMessage = `% too high, Max(${
                          (balance / amount) * 100
                        })`;
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
                <div className="col-span-4 md:col-span-2">
                  <input
                    className="font-normal font-satoshi text-tiny tracking-normal w-full border border-greyborder outline-none focus:border-accent p-2 placeholder-black disabled:placeholder-greyborder disabled:text-greyborder"
                    type="text"
                    placeholder="Amount"
                    ref={amountField}
                    disabled={disabled.amountField}
                    onChange={(e) => {
                      let errorMessage;
                      if (!e.target.value) {
                        errorMessage = "Amount is required";
                      } else if (
                        Number(e.target.value.replace(/,/g, "")) > balance
                      ) {
                        errorMessage = `Too high, Max(${balance.toLocaleString()})`;
                      } else if (
                        Number(e.target.value.replace(/,/g, "")) === 0 ||
                        Number(e.target.value.replace(/,/g, "")) < 0
                      ) {
                        errorMessage = "Too low";
                      } else if (!Number(e.target.value.replace(/,/g, ""))) {
                        errorMessage = "Invalid Amount";
                      }

                      if (errorMessage) {
                        setError(errorMessage);
                        setDisabled((disabled) => ({
                          ...disabled,
                          percentageField: true,
                        }));
                        amountFieldError.current.classList.remove("hidden");
                        amountFieldError.current.textContent = errorMessage;
                        amountField.current.classList.remove(
                          "border-greyborder",
                          "focus:border-accent"
                        );
                        amountField?.current?.classList.add(
                          "border-error",
                          "focus:border-error"
                        );
                        return;
                      }

                      amountFieldError.current.textContent = "";
                      amountFieldError.current.classList.add("hidden");
                      amountField?.current?.classList.remove(
                        "border-error",
                        "focus:border-error"
                      );
                      amountField?.current?.classList.add(
                        "border-greyborder",
                        "focus:border-accent"
                      );
                      setDisabled((disabled) => ({
                        ...disabled,
                        percentageField: false,
                      }));
                      return;
                    }}
                    onKeyUp={(e) => {
                      const inputValue = e.target.value.replace(/,/g, "");
                      const numericInputValue = Number(inputValue);

                      if (numericInputValue) {
                        if (
                          numericInputValue <= balance &&
                          numericInputValue > 0
                        ) {
                          const inputValue = e.target.value.replace(/,/g, "");
                          percentageField.current.value =
                            (Number(inputValue) / amount) * 100;
                        } else {
                          percentageField.current.value = 0;
                        }

                        addThousandSeparators(e.target);
                        return;
                      }

                      percentageField.current.value = 0;
                      return;
                    }}
                  />
                  <p
                    ref={amountFieldError}
                    className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error hidden"
                  ></p>
                </div>
                <Button
                  type="submit"
                  className="col-span-4 md:col-span-2 bg-grey font-medium px-8 h-fit text-tiny md:text-small md:py-2.5"
                  onClick={handleAdd}
                  kind="plain"
                >
                  Add Item
                </Button>
              </form>
            </div>
          </div>
          <br className="md:hidden" />
          <section className="md:w-3/12 bg-grey p-4 flex flex-col gap-y-4">
            <h4 className="font-archivo font-normal text-medium leading-140 tracking-normal">
              Summary
            </h4>
            <hr className="border-b-1 border-greyborder" />
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-satoshi text-tiny font-normal leading-100 tracking-normal py-3">
                    Income source
                  </td>
                  <td className="font-satoshi text-tiny font-medium leading-120 tracking-normal py-3 text-right">
                    {project}
                  </td>
                </tr>
                <tr>
                  <td className="font-satoshi text-tiny font-normal leading-100 tracking-normal py-3">
                    Income
                  </td>
                  <td className="font-satoshi text-tiny font-medium leading-120 tracking-normal py-3 text-right">
                    {currencyFormatter(amount)}
                  </td>
                </tr>
                <tr>
                  <td className="font-satoshi text-tiny font-normal leading-100 tracking-normal py-3">
                    Beneficiaries/Items
                  </td>
                  <td className="font-satoshi text-tiny font-medium leading-120 tracking-normal py-3 text-right">
                    {breakdown?.length}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr className="border-b-1 border-greyborder" />
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-satoshi text-tiny font-normal leading-100 tracking-normal py-3">
                    Balance
                  </td>
                  <td className="font-satoshi text-tiny font-medium leading-120 tracking-normal py-3 text-right">
                    {currencyFormatter(
                      breakdown?.length === 0 ? Number(amount) : balance
                    )}
                    /{100 - totalPercentage}%
                  </td>
                </tr>
                <tr>
                  <td className="font-satoshi text-tiny font-normal leading-100 tracking-normal py-3">
                    Spent
                  </td>
                  <td className="font-satoshi text-tiny font-medium leading-120 tracking-normal py-3 text-right">
                    {currencyFormatter(total)} / {totalPercentage}%
                  </td>
                </tr>
              </tbody>
            </table>
            <hr className="border-solid border-b-1 border-greyborder" />
            <Button type="button" className="capitalize py-3 mt-8">
              share
            </Button>
            <div className="flex gap-4">
              <button
                className="w-1/2 py-2 text-error border border-solid border-error text-center font-satoshi font-bold text-small leading-100 tracking-normal"
                // onClick={handleReset}
              >
                Reset
              </button>
              <button className="w-1/2 py-3 text-accent border border-solid border-accent text-center font-satoshi font-bold text-small leading-100 tracking-normal">
                Save
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Distribute;
