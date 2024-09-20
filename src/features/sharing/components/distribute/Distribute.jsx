import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../../../utils/currency.formatter";
// import { uniqueDateStringId } from "../../../../utils/unique.date.id";
import addThousandSeparators from "../../../../utils/add.thousand.separators";

function Distribute() {
  const params = useParams();

  //   const [distributeId, setDistributeId] = useState(uniqueDateStringId());
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
    console.log(amount);
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

  //   const submitToServer = (e) => {
  //     e.preventDefault();
  //     setError(null);
  //     const data = {
  //       project,
  //       total,
  //       totalPercentage,
  //       balance,
  //       breakdown,
  //     };
  //     console.log(data);
  //   };

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

  //   const handleReceived = (e) => {
  //     setError(null);
  //     const index = e.target.getAttribute("data-received-index");
  //     console.log(index);
  //     const myBreakdown = [...breakdown];
  //     const received = myBreakdown[index].received;
  //     console.log(received);
  //     myBreakdown[index].received = !received;
  //     setBreakdown(myBreakdown);
  //   };

  //   const handleSave = () => {
  //     setError(null);
  //     const index = edit;
  //     const myBreakdown = [...breakdown];
  //     const name = nameFieldUpdate.current.value;
  //     const percentage = percentageFieldUpdate.current.value;
  //     if (name === "" || percentage === "") {
  //       setError("Name and Percentage are required!");
  //       return;
  //     }

  //     myBreakdown[index].name = name;
  //     myBreakdown[index].percentage = percentage;
  //     myBreakdown[index].amount = (parseInt(percentage) / 100) * parseInt(amount);

  //     setBreakdown(myBreakdown);
  //     setEdit(null);
  //   };

  const handleUpdate = (index) => {
    // console.log(breakdown[index]);
    breakdown[index].name = nameFieldUpdate.current.value;
    breakdown[index].percentage = Number(percentageFieldUpdate.current.value);
    breakdown[index].amount = Number(
      amountFieldUpdate.current.value.replace(/,/g, "")
    );
    setBreakdown([...breakdown]);
    console.log(breakdown);
    setEdit(null);
  };

  //   const saveToLocal = (e) => {
  //     e.preventDefault();
  //     setError(null);
  //     let invoicesInLocalStorage =
  //       JSON.parse(localStorage.getItem("distributions")) || [];

  //     console.log(invoicesInLocalStorage);

  //     invoicesInLocalStorage = [
  //       {
  //         id: distributeId,
  //         project,
  //         amount: Number(amount),
  //         breakdown: [...breakdown],
  //         remote_id: null,
  //       },
  //       ...invoicesInLocalStorage,
  //     ];

  //     console.log(invoicesInLocalStorage);
  //     const newInvoices = JSON.stringify(invoicesInLocalStorage);
  //     localStorage.setItem("distributions", newInvoices);

  //     return;
  //     /*let data = {};

  // 		data[distributeId] = {
  // 			project,
  // 			total,
  // 			totalPercentage,
  // 			balance,
  // 			breakdown,
  // 			remote_id: null,
  // 		};

  // 		const newInvoices = JSON.stringify(data);
  // 		localStorage.setItem("invoices", newInvoices); */
  //   };

  const retrieveFromLocal = () => {
    const distributions = localStorage.getItem("distributions");
    // console.log(distributions);
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
            <img src="Icon5.png.png" alt="budgeting" />
            <h3 className="py-4 text-xl font-bold">Budgeting Assitance</h3>
            <p>
              Create and stick to a budget by showing your
              <br className="hidden" />
              spending and indetifying areas of overspending.
            </p>
          </article>

          <article className="bg-gray-200 p-6 rounded">
            <img src="Icon6.png.png" alt="saving" />
            <h3 className="py-4 text-xl font-bold">Saving Money</h3>
            <p>
              Indetify and cut unnecessary expenses to save{" "}
              <br className="hidden" />
              money.
            </p>
          </article>
        </div>
      </section>
      {/* {!amount && <HowTo />} */}
      <article>
        <h2 className="text-3xl font-sans mb-10">Expense/Budget</h2>
      </article>
      <section className="md:flex justify-between">
        <div className="md:w-8/12">
          <div className="flex flex-col justify-between">
            <div className="flex flex-wrap gap-y-5 justify-between">
              <div className="w-[60%] flex flex-col justify-end">
                <label className="block">Income source</label>
                <input
                  className="w-full border border-gray-500 p-4 mt-2 placeholder-black"
                  type="text"
                  placeholder="Income source"
                  onChange={(e) => setProject(e.target.value)}
                />
              </div>
              <div className="w-[34%] flex flex-col justify-end">
                <label className="block">Amount</label>
                <input
                  className="w-full border border-gray-500 p-4 mt-2 placeholder-black"
                  type="text"
                  placeholder="Amount"
                  onChange={(e) => {
                    const amount = Number(e.target.value.replace(/,/g, ""));
                    setAmount(amount);
                  }}
                  onKeyUp={(e) => {
                    addThousandSeparators(e.target);
                  }}
                />
              </div>
              <textarea
                className="w-full border border-gray-500 p-4 mt-2 placeholder-black"
                placeholder="Provide some details about your income source."
                ref={incomeDetailsField}
                onChange={(e) => setIncomeDetails(e.target.value)}
              ></textarea>
            </div>
            <br className="mt-5" />
            <h2 className="font-bold">Expenditure/Budget info.</h2>
            <p>
              Provide details about expenditure or budget. Specify name,
              percentage or amount per item. Click Add Item to add more items or
              beneficiaries.
            </p>
            <br className="mt-5" />

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Percentage</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              {breakdown.length > 0 && (
                <tbody>
                  {breakdown.map((person, index) => {
                    return edit === index ? (
                      <tr
                        key={index.toString()}
                        className={index % 2 === 0 && `bg-gray-200`}
                      >
                        <td className="p-2">
                          <input
                            type="text"
                            defaultValue={person.name}
                            ref={nameFieldUpdate}
                            className="w-full border border-gray-500 py-1 p-2 placeholder-black"
                          />
                        </td>
                        <td className="flex p-2 justify-center">
                          <span className="w-fit py-1 p-2 border border-gray-500 bg-white">
                            <input
                              type="text"
                              defaultValue={person.percentage}
                              ref={percentageFieldUpdate}
                              onKeyUp={(e) => {
                                amountFieldUpdate.current.value =
                                  (Number(e.target.value) / 100) * amount;
                                addThousandSeparators(
                                  amountFieldUpdate.current
                                );
                              }}
                              className="w-7 pl-1 border-0 outline-0 placeholder-black "
                            />
                            %
                          </span>
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            defaultValue={person.amount.toLocaleString()}
                            ref={amountFieldUpdate}
                            onKeyUp={(e) => {
                              const inputValue = e.target.value.replace(
                                /,/g,
                                ""
                              );
                              percentageFieldUpdate.current.value =
                                (Number(inputValue) / amount) * 100;
                              addThousandSeparators(e.target);
                            }}
                            className="w-full border border-gray-500 py-1 p-2 placeholder-black"
                          />
                        </td>
                        <td colSpan="2">
                          <button
                            className="w-fit bg-gray-200 font-bold text-accent py-1 px-6"
                            onClick={() => handleUpdate(index)}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={index.toString()}
                        className={index % 2 === 0 && `bg-gray-200`}
                      >
                        <td className="p-2">{person.name}</td>
                        <td className="p-2">{person.percentage}%</td>
                        <td className="p-2">
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
              <tfoot>
                <tr className="border-t-2">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Percentage</th>
                  <th className="text-left p-2">Amount</th>
                  {/* <td className="p-2">Give/Take Cash</td> */}
                </tr>
              </tfoot>
            </table>

            <br className="mt-3" />
            <form
              className="flex xs:flex-wrap md:flex-nowrap justify-between xs:gap-y-3 md:gap-y-0"
              onSubmit={handleAdd}
            >
              <input
                className="md:w-[30%] xs:w-[40%] border border-gray-500 p-2 placeholder-black"
                type="text"
                placeholder="Name"
                ref={nameField}
              />
              <input
                className="md:w-[10%] xs:w-[20%] border border-gray-500 p-2 placeholder-black"
                type="text"
                placeholder="%"
                value={percentageField.value}
                ref={percentageField}
                onKeyUp={(e) => {
                  if (e.target?.value) {
                    amountField.current.value =
                      (Number(e.target.value) / 100) * amount;
                    addThousandSeparators(amountField.current);
                  }
                }}
              />
              <input
                className="md:w-[30%] xs:w-[32%] border border-gray-500 p-2 placeholder-black"
                type="text"
                placeholder="Amount"
                ref={amountField}
                onKeyUp={(e) => {
                  if (e.target?.value) {
                    const inputValue = e.target.value.replace(/,/g, "");
                    percentageField.current.value =
                      (Number(inputValue) / amount) * 100;

                    addThousandSeparators(e.target);
                  }
                }}
              />
              {/* <select
								name=""
								id=""
								className="border border-gray-500 p-2 text-sm outline-none bg-white flex placeholder-black">
								<option value="">Select one</option>
								<option value="">Take cash</option>
								<option value="">Give cash</option>
							</select> */}
              <button
                className="xs:w-[46%] md:w-fit bg-gray-200 font-bold text-accent border-none py-2 px-6"
                onClick={handleAdd}
              >
                Add Item
              </button>
              {/* 							<button className="xs:w-[46%] md:w-fit bg-gray-200 font-bold text-accent py-2 px-6">
								Save
							</button> */}
            </form>
          </div>
        </div>
        <br className="md:hidden" />
        <div className="md:w-3/12 bg-gray-200 p-5">
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
                <td className="py-2 text-right">{currencyFormatter(amount)}</td>
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
          <button className="bg-accent w-full h-10 text-white">
            Share
          </button>
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
    </>
  );
}

export default Distribute;
