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
	const amountField = useRef();
	const nameFieldUpdate = useRef();
	const percentageFieldUpdate = useRef();
	const amountFieldUpdate = useRef();
	const [distributions, setDistributions] = useState(null);
	const [selectedDistribution, setSelectedDistribution] = useState(null);
	const handleAdd = (e) => {
		e.preventDefault();
		setError(null);
		const name = nameField.current.value;
		const percentage = percentageField.current.value;
		const amount = amountField.current.value;
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
		myBreakdown[index].amount =
			(parseInt(percentage) / 100) * parseInt(amount);

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
				distributions.filter(
					(distribution) => distribution.id === params.id
				)[0]
			);
		}
	};

	return (
		<>
			<section className="flex md:flex-row xs:flex-col-reverse py-10">
				<div className="md:w-1/2 flex flex-col justify-between">
					<h1 className="xs:font-bold md:text-5xl font-sans">
						Effortlessly Track Your <br className="xs:hidden" />
						Expenses & Generate <br className="xs:hidden" />
						Professional Invoices
					</h1>
					<p className="py-4 md:text-2xl">
						Simplify the process, making it easy for you to track
						your <br className="xs:hidden" />
						expenses and generate professional invoices in minutes.
					</p>
					<button className="py-4 px-14 mt-4 bg-blue text-white text-center md:w-fit">
						Start Now, It's Free
					</button>
				</div>
				<div className="md:w-1/2 md:flex flex-end">
					<img
						className="w-full h-auto"
						src="Colunm.png.png"
						alt="invoices "
					/>
					<br className="md:hidden" />
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
						<img src="Icon1.png.png" />
						<h3 className="py-4 text-xl font-bold">
							Income details
						</h3>
						<p>Add the amount you earned.</p>
					</article>
					<article className="bg-gray-200 pt-4 pl-4 pb-5 rounded">
						<img src="Icon2.png.png" />
						<h3 className="py-4 text-xl font-bold">
							Beneficiaries
						</h3>
						<p>
							Enter the Name and Percentage/Amount of each person.{" "}
							<br />
							Made a mistake? No worries you can edit or delete.
						</p>
					</article>
					<article className="bg-gray-200 pt-4 pl-4 pb-5 rounded">
						<img src="Icon3.png.png" />
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
						<img src="Icon4.png.png" />
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
						<img src="Icon5.png.png" />
						<h3 className="py-4 text-xl font-bold">
							Budgeting Assitance
						</h3>
						<p>
							Create and stick to a budget by showing your
							<br className="hidden" />
							spending and indetifying areas of overspending.
						</p>
					</article>

					<article className="bg-gray-200 p-6 rounded">
						<img src="Icon6.png.png" />
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
						<div className="flex xs:flex-wrap md:flex-nowrap md:gap-10 justify-between">
							<div className="md:w-1/3 xs:w-2.25/5 flex flex-col justify-end">
								<label className="block">Income source</label>
								<input
									className="w-full border border-gray-500 p-4 mt-2 placeholder-black"
									type="text"
									placeholder="Income source"
									onBlur={(e) => setProject(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setProject(e.target.value);
										}
									}}
								/>
							</div>
							<div className="md:w-1/3 xs:w-2/5 flex flex-col justify-end">
								<label className="block">Amount</label>
								<input
									className="w-full border border-gray-500 p-4 mt-2 placeholder-black"
									type="text"
									placeholder="Amount"
									onBlur={(e) => setAmount(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setAmount(e.target.value);
										}
									}}
								/>
							</div>
							<div className="md:w-1/3 xs:w-full">
								<button className="w-full text-center bg-gray-200 py-4 px-6 mt-9 text-primary-900 font-bold">
									Add Income
								</button>
							</div>
						</div>

						<br className="my-5" />

						{/* 						<div className="flex justify-between bg-gray-200 p-4 items-center">
							<p>Divide using</p>
							<div className="flex-inline">
								<span className="px-2 text-sm">
									Manual Amount
								</span>
								<input
									type="checkbox"
									className="mt-1 relative appearance-none inline-block h-[30px] w-[50px] cursor-pointer rounded-full bg-blue shadow-md transition-all after:content-[''] after:absolute after:top-1 after:-left-1 after:h-5 after:w-7 after:rounded-full after:bg-white after:shadow-sm after:transition-all checked:after:bg-gray-200 checked:after:translate-x-6 border border-solid border-spacing-1 border-black"
								/>
								<span className="px-2 text-sm">Percentage</span>
							</div>
						</div> */}
						<br className="mt-5" />
						{breakdown.length > 0 && (
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b-2">
										<td className="p-2">Name</td>
										<td className="p-2">Percentage</td>
										<td className="p-2">Amount</td>
										{/* <td className="p-2">Give/Take Cash</td> */}
									</tr>
								</thead>
								<tbody>
									{breakdown.map((person, index) => {
										return edit === index ? (
											<tr key={index.toString()}>
												<td className="p-2">
													<input
														type="text"
														value={person.name}
													/>
												</td>
												<td className="p-2">45%</td>
												<td className="p-2">45000</td>
												<td className="text-red-600 underline p-2">
													Delete
												</td>
												<td className="underline p-2">
													Edit
												</td>
											</tr>
										) : (
											<tr key={index.toString()}>
												<td className="p-2">
													{person.name}
												</td>
												<td className="p-2">
													{person.percentage}%
												</td>
												<td className="p-2">
													{currencyFormatter(
														person.amount
													)}
												</td>
												<td className="p-2">
													<button
														data-index={index}
														onClick={handleRemove}
														variant="outline-danger"
														size="sm"
														className="text-red-600 underline p-2 cursor-pointer">
														Delete
													</button>
												</td>
												<td className="p-2">
													<button
														data-edit-index={index}
														onClick={handleEdit}
														variant="outline-info"
														className="underline p-2 cursor-pointer"
														size="sm">
														Edit
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
								<tfoot>
									<tr className="border-t-2">
										<td className="p-2">Name</td>
										<td className="p-2">Percentage</td>
										<td className="p-2">Amount</td>
										{/* <td className="p-2">Give/Take Cash</td> */}
									</tr>
								</tfoot>
							</table>
						)}
						<br className="mt-3" />
						<form
							className="flex xs:flex-wrap md:flex-nowrap justify-between xs:gap-y-3 md:gap-y-0"
							onSubmit={handleAdd}>
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
								onBlur={(e) => {
									if (e.target?.value) {
										amountField.current.value =
											(Number(e.target.value) / 100) *
											amount;
									}
								}}
							/>
							<input
								className="md:w-[30%] xs:w-[32%] border border-gray-500 p-2 placeholder-black"
								type="text"
								placeholder="Amount"
								ref={amountField}
								onBlur={(e) => {
									if (e.target?.value) {
										percentageField.current.value =
											(Number(e.target.value) / amount) *
											100;
									}
								}}
							/>
							{/* 							<select
								name=""
								id=""
								className="border border-gray-500 p-2 text-sm outline-none bg-white flex placeholder-black">
								<option value="">Select one</option>
								<option value="">Take cash</option>
								<option value="">Give cash</option>
							</select> */}
							<button
								className="xs:w-[46%] md:w-fit text-primary-800 bg-gray-200 font-bold text-primary-900 border-none py-2 px-6"
								onClick={handleAdd}>
								Add
							</button>
							<button className="xs:w-[46%] md:w-fit bg-gray-200 font-bold text-primary-900 py-2 px-6">
								Save
							</button>
						</form>
					</div>
				</div>
				<br className="md:hidden" />
				<div className="md:w-3/12 bg-gray-200 p-5">
					<h2 className="font-semibold py-2">Summary</h2>
					<hr className="border-solid border-b-1 border-gray-400 my-5" />
					<table className="w-full">
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
							<td className="py-2 text-right">
								{breakdown?.length}
							</td>
						</tr>
					</table>
					<hr className="border-b-1 border-gray-400 my-5" />
					<table className="w-full">
						<tr>
							<td className="py-2">Balance</td>
							<td className="py-2 text-right">
								{currencyFormatter(
									breakdown?.length === 0 ? amount : balance
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
					</table>
					<hr className="border-solid border-b-1 border-gray-400 my-5" />
					<br className="py-10" />
					<button className="bg-primary-900 w-full h-10 text-white">
						Share
					</button>
					<div className="flex gap-5 pt-5">
						<button className="w-1/2 py-2 text-red-700 border border-solid border-red-600 text-center">
							Reset
						</button>
						<button className="w-1/2 py-2 text-primary-900 border border-solid border-primary-900 text-center">
							Save
						</button>
					</div>
				</div>
			</section>
			{/* 			<div className="grid md:grid-cols-12 xs:mx-5 sm:mx-10 md:mx-20 rounded-sm md:gap-5 mt-4">
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
										onBlur={(e) =>
											setProject(e.target.value)
										}
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
										peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
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
										onBlur={(e) =>
											setAmount(e.target.value)
										}
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
										peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
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
							<h4 className="text-secondary">
								Add Benecificiaries{" "}
							</h4>
							<p>Beneficiary name and portion in percentage</p>
							<Form onSubmit={handleAdd}>
								<div className="input-group">
									<FloatingLabel
										controlId="floatingInput"
										label="Name">
										<Form.Control
											ref={nameField}
											placeholder="e.g John Doe"
										/>
									</FloatingLabel>
									<FloatingLabel
										controlId="floatingInput"
										label="Percentage">
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
						<Table
							className="mt-4 striped bordered hover"
							size="sm">
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
													defaultValue={
														breakdown[index].name
													}
												/>
											</td>
											<td>
												<FormControl
													size="sm"
													ref={percentageFieldUpdate}
													defaultValue={
														breakdown[index]
															.percentage
													}
												/>
											</td>
											<td>
												<button
													variant="success"
													size="sm"
													onClick={handleSave}>
													Save
												</button>
											</td>
										</tr>
									) : (
										<tr key={index.toString()}>
											<td>{person.name}</td>
											<td>{person.percentage}%</td>
											<td>
												{currencyFormatter(
													person.amount
												)}
											</td>
											<td>
												<button
													data-index={index}
													onClick={handleRemove}
													variant="outline-danger"
													size="sm"
													className="me-1">
													Delete
												</button>
												<button
													data-edit-index={index}
													onClick={handleEdit}
													variant="outline-info"
													className="me-1"
													size="sm">
													Edit
												</button>
												{person.received && (
													<button
														data-received-index={
															index
														}
														onClick={handleReceived}
														variant="outline-info"
														size="sm">
														Cashback
													</button>
												)}
												{!person.received && (
													<button
														data-received-index={
															index
														}
														onClick={handleReceived}
														variant="outline-info"
														size="sm">
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
											breakdown?.length === 0
												? amount
												: balance
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
										<th className="border-slate-300 border p-2">
											Name
										</th>
										<th className="border-slate-300 border p-2">
											Percentage
										</th>
										<th className="border-slate-300 border p-2">
											Amount
										</th>
										<th className="border-slate-300 border p-2">
											Received
										</th>
									</tr>
								</thead>
								<tbody>
									{selectedDistribution.breakdown.map(
										(bdown) => (
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
												<td className="border-slate-300 border p-2">
													Status
												</td>
											</tr>
										)
									)}
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
									<th className="border border-slate-300 p-2">
										Project
									</th>
									<th className="border border-slate-300 p-2">
										Income
									</th>
									<th className="border border-slate-300 p-2">
										Spent to
									</th>
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
											{distribution.breakdown?.length ||
												0}
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
							<span className="text-[#798088]">
								Shared Amount
							</span>
							<br />
							<span className="text-dark">
								{currencyFormatter(amount)}
							</span>
						</p>
						<p className="font-light text-sm py-2">
							<span className="text-[#798088]">Distributed</span>
							<br />
							<span className="text-dark">
								{currencyFormatter(total)} / {totalPercentage}%
							</span>
						</p>
						<p className="font-light text-sm py-2">
							<span className="text-[#798088]">
								Number of beneficiaries
							</span>
							<br />
							<span className="text-dark">
								{breakdown?.length} Beneficiaries
							</span>
						</p>
						<p className="font-light text-sm py-2">
							<span className="text-[#798088]">
								Unshared Amount
							</span>
							<br />
							<span className="text-dark">
								{currencyFormatter(
									breakdown?.length === 0 ? amount : balance
								)}{" "}
								/ {100 - totalPercentage}%
							</span>
						</p>

						<div className="grid grid-cols-2 gap-2">
							<button
								type="reset"
								onClick={handleReset}
								className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-2 rounded-md">
								Reset
							</button>

							<button
								type="submit"
								onClick={saveToLocal}
								className="bg-green-700 hover:bg-green-800 text-white rounded-md">
								Save
							</button>
						</div>
					</div>
				</div>
			</div> */}
		</>
	);
}

export default Distribute;
