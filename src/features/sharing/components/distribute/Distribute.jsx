import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HowTo from "../howto";
import { currencyFormatter } from "../../../../utils/currency.formatter";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";
import { uniqueDateStringId } from "../../../../utils/unique.date.id";
// Form handling
// import { Formik, Form, Field } from "formik";

function Distribute() {
  const params = useParams();

  const [distributeId, setDistributeId] = useState(uniqueDateStringId());
  const [amount, setAmount] = useState(0);
  const [project, setProject] = useState("");
  const [total, setTotal] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const nameField = useRef();
  const percentageField = useRef();
  const nameFieldUpdate = useRef();
  const percentageFieldUpdate = useRef();
  const [distributions, setDistributions] = useState(null);
  const [selectedDistribution, setSelectedDistribution] = useState(null);
  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);
    const name = nameField.current.value;
    const percentage = percentageField.current.value;

    if (name === "" || percentage === "") {
      setError("Please enter a name and percentage");
      return;
    }

    if (error) return;

    const myAmount = (parseInt(percentage) / 100) * parseInt(amount);
    setBreakdown([
      ...breakdown,
      { name, percentage, amount: myAmount, received: false },
    ]);
    nameField.current.value = "";
    percentageField.current.value = "";
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
  const calculateTotal = () => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.amount));
    }, 0);
  };

  const calculateTotalPercentage = () => {
    return breakdown.reduce((acc, curr) => {
      return (acc += parseInt(curr.percentage));
    }, 0);
  };

  const handleReset = (e) => {
    setBreakdown([]);
    setAmount(0);
    setTotal(0);
    setBalance(0);
    setError(null);
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
    setEdit(e.target.getAttribute("data-edit-index"));
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
  }, [breakdown, params, error]);

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

  const saveToLocal = (e) => {
    e.preventDefault();
    setError(null);
    let invoicesInLocalStorage =
      JSON.parse(localStorage.getItem("distributions")) || [];

    console.log(invoicesInLocalStorage);

    invoicesInLocalStorage = [
      {
        id: distributeId,
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
    console.log(distributions);
    if (distributions) {
      setDistributions(JSON.parse(distributions));
    }
  };

  const selectDistribution = () => {
    if (params?.id && distributions?.length) {
      setSelectedDistribution(
        distributions.filter((distribution) => distribution.id === params.id)[0]
      );
    }
  };

  return (
    <>
      {!amount && <HowTo />}
      <div className="grid md:grid-cols-12 xs:mx-5 sm:mx-10 md:mx-20 rounded-sm md:gap-5 mt-4">
        <div className="md:col-span-9">
          {!amount && (
            <>
              <div className="grid md:grid-cols-2 md:gap-5 sm:gap-2 sm:gap-y-2 xs:gap-y-2 mb-2">
                <div className="relative inline">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-900
										dark: bg-gray-500
										focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onBlur={(e) => setProject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setProject(e.target.value);
                      }
                    }}
                  />
                  <label
                    htmlFor="floating_outlined border border-red-500"
                    className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-gray-100
										peer-focus:dark:bg-gray-400
										peer-placeholder-shown:scale-100
										peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    What is the source of your money?
                  </label>
                </div>

                <div className="relative inline">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="border block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-gray-300 appearance-none dark:text-gray-200 dark:border-gray-600 dark:focus:border-gray-900
										dark: bg-gray-500
										focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onBlur={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setAmount(e.target.value);
                      }
                    }}
                  />
                  <label
                    htmlFor="floating_outlined border border-red-500"
                    className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-gray-100
										peer-focus:dark:bg-gray-400
										peer-placeholder-shown:scale-100
										peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Enter amount to be shared
                  </label>
                </div>
              </div>
              <button className="w-full text-md py-2 text-white rounded-md bg-[#007BFF] hover:bg-[#0B5ED7] mb-5">
                Enter
              </button>
            </>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          {amount > 0 && (
            <div className="p-2 bg-light border rounded">
              <h4 className="text-secondary">Add Benecificiaries </h4>
              <p>Beneficiary name and portion in percentage</p>
              <Form onSubmit={handleAdd}>
                <div className="input-group">
                  <FloatingLabel controlId="floatingInput" label="Name">
                    <Form.Control ref={nameField} placeholder="e.g John Doe" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Percentage">
                    <Form.Control
                      ref={percentageField}
                      placeholder="10%"
                      required
                    />
                  </FloatingLabel>
                  <button type="submit" onClick={handleAdd}>
                    Add
                  </button>
                </div>
              </Form>
            </div>
          )}
          {breakdown.length > 0 && (
            <Table className="mt-4 striped bordered hover" size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Percentage</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((person, index) => {
                  return edit === index ? (
                    <tr key={index.toString()}>
                      <td colSpan="2">
                        <FormControl
                          size="sm"
                          ref={nameFieldUpdate}
                          defaultValue={breakdown[index].name}
                        />
                      </td>
                      <td>
                        <FormControl
                          size="sm"
                          ref={percentageFieldUpdate}
                          defaultValue={breakdown[index].percentage}
                        />
                      </td>
                      <td>
                        <button
                          variant="success"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index.toString()}>
                      <td>{person.name}</td>
                      <td>{person.percentage}%</td>
                      <td>{currencyFormatter(person.amount)}</td>
                      <td>
                        <button
                          data-index={index}
                          onClick={handleRemove}
                          variant="outline-danger"
                          size="sm"
                          className="me-1"
                        >
                          Delete
                        </button>
                        <button
                          data-edit-index={index}
                          onClick={handleEdit}
                          variant="outline-info"
                          className="me-1"
                          size="sm"
                        >
                          Edit
                        </button>
                        {person.received && (
                          <button
                            data-received-index={index}
                            onClick={handleReceived}
                            variant="outline-info"
                            size="sm"
                          >
                            Cashback
                          </button>
                        )}
                        {!person.received && (
                          <button
                            data-received-index={index}
                            onClick={handleReceived}
                            variant="outline-info"
                            size="sm"
                          >
                            Give Cash
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th>Distributed </th>
                  <th>{totalPercentage}%</th>
                  <th>{currencyFormatter(total)}</th>
                  <th></th>
                </tr>
                <tr>
                  <th>Undistributed</th>
                  <th>{100 - totalPercentage}%</th>
                  <th>
                    {currencyFormatter(
                      breakdown?.length === 0 ? amount : balance
                    )}
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </Table>
          )}

          {selectedDistribution && (
            <>
              <h2>Details of Expenditure</h2>
              <p>Project: {selectedDistribution.project}</p>
              <p>Income: {selectedDistribution.amount}</p>
              <table className="border-collapse border-slate-400 border table-bordered">
                <thead>
                  <tr>
                    <th className="border-slate-300 border p-2">Name</th>
                    <th className="border-slate-300 border p-2">Percentage</th>
                    <th className="border-slate-300 border p-2">Amount</th>
                    <th className="border-slate-300 border p-2">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDistribution.breakdown.map((bdown) => (
                    <tr>
                      <td className="border-slate-300 border p-2">
                        {bdown.name}
                      </td>
                      <td className="border-slate-300 border p-2">
                        {bdown.percentage}
                      </td>
                      <td className="border-slate-300 border p-2">
                        {bdown.amount}
                      </td>
                      <td className="border-slate-300 border p-2">Status</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {distributions?.length && (
            <table className="table-auto border-collapse border border-slate-400">
              <caption>
                <h2>History</h2>
              </caption>
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Project</th>
                  <th className="border border-slate-300 p-2">Income</th>
                  <th className="border border-slate-300 p-2">Spent to</th>
                </tr>
              </thead>
              <tbody>
                {distributions.map((distribution) => (
                  <tr>
                    <td className="border border-slate-300 p-2">
                      <Link to={`/${distribution.id}`}>
                        {distribution.project}
                      </Link>
                    </td>
                    <td className="border border-slate-300 p-2">
                      <Link to={`/${distribution.id}`}>
                        {distribution.amount}
                      </Link>
                    </td>
                    <td className="border border-slate-300 p-2">
                      {distribution.breakdown?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="md:col-span-3 sm:mb-5 xs:mb-5 md:mb-5">
          <div className="p-2 bg-[#F8F9FA] border rounded-md">
            <h5 className="font-semibold text-lg mb-2 text-gray-700">
              Summary
            </h5>
            <hr />
            <p className="font-light text-sm py-2">
              <span className="text-[#798088]">Project</span>
              <br />
              {project}
            </p>
            <p className="font-light text-sm py-2">
              <span className="text-[#798088]">Shared Amount</span>
              <br />
              <span className="text-dark">{currencyFormatter(amount)}</span>
            </p>
            <p className="font-light text-sm py-2">
              <span className="text-[#798088]">Distributed</span>
              <br />
              <span className="text-dark">
                {currencyFormatter(total)} / {totalPercentage}%
              </span>
            </p>
            <p className="font-light text-sm py-2">
              <span className="text-[#798088]">Number of beneficiaries</span>
              <br />
              <span className="text-dark">
                {breakdown?.length} Beneficiaries
              </span>
            </p>
            <p className="font-light text-sm py-2">
              <span className="text-[#798088]">Unshared Amount</span>
              <br />
              <span className="text-dark">
                {currencyFormatter(breakdown?.length === 0 ? amount : balance)}{" "}
                / {100 - totalPercentage}%
              </span>
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="reset"
                onClick={handleReset}
                className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-2 rounded-md"
              >
                Reset
              </button>

              <button
                type="submit"
                onClick={saveToLocal}
                className="bg-green-700 hover:bg-green-800 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Distribute;
