import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";
import { currencyFormatter } from "./currency.formatter";
import PDFDoc from "./PDFDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";
const initialValues = {
	logo: "",
	sender: "",
	receiver: "",
	shipping_address: "",
	title: "",
	bill_number: "",
	issue_date: "",
	due_date: "",
	terms: "",
	notes: "",
	discount: "",
	tax: "",
	shipping: "",
	paid: "",
	balance_due: "",
	paper_size: "A4",
	orientation: "portrait",
	currency: "USD",
	items: [
		{
			title: "",
			quantity: "",
			measurement: "",
			price: "",
			amount: "",
		},
	],
};

const subTotal = (values) => {
	return values.items.reduce((acc, curr) => {
		return acc + parseInt(curr.amount);
	}, 0);
};
const getBase64 = (file) => {
	return new Promise((resolve) => {
		let baseURL = "";
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			baseURL = reader.result;
			resolve(baseURL);
		};
		reader.onerror = (error) => {
			console.log("Error: ", error);
		};
	});
};

const Invoice = () => {
	const logoPicker = React.useRef();
	const triggerLogoPicker = () => {
		logoPicker.current.click();
	};
	const saveInvoice = (values) => {
		console.log("save invoice");
		const getInvoices = localStorage.getItem("invoices");
		const oldInvoices = JSON.parse(getInvoices);
		const newInvoices =
			oldInvoices?.length > 0 ? [...oldInvoices, values] : [values];
		localStorage.setItem("invoices", JSON.stringify(newInvoices));
		console.log(newInvoices);
	};

	return (
		<>
			<h2>Generate Bill</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
				}}>
				{({ values, setFieldValue }) => (
					<Form>
						<Row>
							<Col className="hstack">
								<Field as="select" name="paper_size">
									<option value="-">- Paper size -</option>
									<option value="A6">A6</option>
									<option value="A5">A5</option>
									<option value="A4">A4</option>
									<option value="Letter">Letter</option>
								</Field>
								<Field as="select" name="orientation">
									<option value="-">- Oritentation -</option>
									<option value="portrait">Portrait</option>
									<option value="landscape">Landscape</option>
								</Field>
								<Field as="select" name="currency">
									<option value="-">- Currency -</option>
									<option value="UGX">
										Uganda Shillings
									</option>
									<option value="KES">Kenya Shillings</option>
									<option value="USD">
										United States Dollar
									</option>
									<option value="GBP">
										Great Britain Pound
									</option>
								</Field>
								{subTotal(values) > 0 && (
									<PDFDownloadLink
										className="btn btn-primary"
										document={<PDFDoc data={values} />}
										fileName={
											`#${values?.bill_number}.pdf` ||
											"#invoice.pdf"
										}>
										{({ loading }) =>
											loading
												? "Loading document"
												: "↓ Download PDF"
										}
									</PDFDownloadLink>
								)}
								<button
									className="btn btn-info"
									type="button"
									onClick={() => saveInvoice(values)}>
									Save
								</button>
							</Col>
						</Row>
						<Row>
							<Col>
								<Row className="mt-4 mb-4">
									<Col className="d-flex flex-column justify-content-end ps-0">
										{values?.logo ? (
											<a href="#">
												<span
													style={{
														cursor: "pointer",
													}}
													className="cursor-pointer"
													onClick={() => {
														setFieldValue(
															"logo",
															null
														);
													}}>
													x
												</span>
												<img
													src={values.logo}
													width="100"
													height="100"
													alt="Logo"
												/>
											</a>
										) : (
											<>
												<input
													type="file"
													accept="image/*"
													name="logo"
													className="form-control"
													placeholder="Logo"
													ref={logoPicker}
													onChange={(e) => {
														getBase64(
															e.currentTarget
																.files[0]
														).then((base64) => {
															setFieldValue(
																"logo",
																base64
															);
														});
													}}
													hidden
												/>
												<button
													type="button"
													className="btn btn-primary mb-3"
													onClick={triggerLogoPicker}>
													Add logo
												</button>
											</>
										)}
										<Field
											as="textarea"
											placeholder="Sender's information"
											className="form-control mb-4"
											name="sender"
										/>
										<Field
											as="textarea"
											placeholder="Receiver's information"
											className="form-control"
											name="receiver"
										/>
									</Col>
									<Col className="d-flex flex-column justify-content-end">
										<Field
											as="textarea"
											placeholder="Shipping Address"
											className="form-control"
											name="shipping_address"
										/>
									</Col>
									<Col className="d-flex flex-column justify-content-end pe-0">
										<div className="mb-1">
											<Field
												type="text"
												name="title"
												placeholder="Title"
												className="p-1 form-control"
											/>
										</div>
										<div className="hstack mb-1">
											<div className="w-50">
												<label
													htmlFor="bill_number"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													Number #.
												</label>
											</div>
											<div className="w-50">
												<Field
													type="text"
													name="bill_number"
													className="p-1 form-control"
												/>
											</div>
										</div>

										<div className="hstack mb-1">
											<div className="w-50">
												<label
													htmlFor="issue_date"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													Issue Date
												</label>
											</div>
											<div className="w-50">
												<Field
													type="date"
													name="issue_date"
													className="p-0 form-control"
												/>
											</div>
										</div>
										<div className="hstack mb-1">
											<div className="w-50">
												<label
													htmlFor="due_date"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													Due Date
												</label>
											</div>
											<div className="w-50">
												<Field
													type="date"
													name="due_date"
													className="p-1 form-control"
												/>
											</div>
										</div>
									</Col>
								</Row>
								<Row className="bg-dark text-light rounded">
									<Col md="6">Title</Col>
									<Col md="1" className="p-1">
										Quantity
									</Col>
									<Col md="1" className="p-1">
										Units
									</Col>
									<Col md="2" className="p-1">
										Price
									</Col>
									<Col md="2">Amount</Col>
								</Row>
								<FieldArray name="items">
									{({ insert, remove, push }) => (
										<>
											{values.items.length > 0 &&
												values.items.map(
													(item, index) => (
														<Row
															key={index}
															className="my-1">
															<Col
																md="6"
																className="px-0">
																<Field
																	name={`items.${index}.title`}
																	placeholder="Shoes"
																	type="text"
																	className="p-1 form-control"
																/>
															</Col>
															<Col
																md="1"
																className="px-0">
																<Field
																	name={`items.${index}.quantity`}
																	placeholder="ex:4"
																	type="text"
																	className="p-1 form-control"
																/>
															</Col>
															<Col md="1">
																<Field
																	name={`items.${index}.measurement`}
																	placeholder="ex:Lbs"
																	type="text"
																	className="p-1 form-control"
																/>
															</Col>
															<Col
																md="2"
																className="px-0">
																<Field
																	name={`items.${index}.price`}
																	placeholder="400"
																	type="text"
																	className="p-1 form-control"
																/>
															</Col>
															<Col
																md="2"
																className="p-2 hstack">
																{currencyFormatter(
																	(values.items[
																		index
																	].amount =
																		item.price *
																		item.quantity),
																	values.currency
																)}
																{values.items
																	.length >
																	1 && (
																	<span
																		className="text-danger btn btn-sm d-block text-end"
																		onClick={() =>
																			remove(
																				index
																			)
																		}>
																		X
																	</span>
																)}
															</Col>
														</Row>
													)
												)}
											<Row>
												<Col className="p-0">
													<span
														className="btn btn-sm btn-success"
														onClick={() =>
															push({
																title: "",
																quantity: "",
																measurement: "",
																price: "",
																amount: "",
															})
														}>
														+ Add item
													</span>
												</Col>
											</Row>
										</>
									)}
								</FieldArray>
								<Row className="mt-5">
									<Col className="p-0 m-0 pe-3">
										<p>
											<label
												htmlFor="notes"
												className="text-secondary fw-lighter">
												Notes
											</label>
											<Field
												name="notes"
												id="notes"
												placeholder="Notes"
												as="textarea"
												className="form-control"
											/>
										</p>
										<p className="mt-2">
											<label
												htmlFor="terms"
												className="text-secondary fw-lighter">
												Terms
											</label>
											<Field
												name="terms"
												id="terms"
												placeholder="Terms"
												as="textarea"
												className="form-control"
											/>
										</p>
									</Col>
									<Col className="p-0 m-0">
										<p className="text-secondary fw-lighter text-end ">
											Sub Total{" "}
											{currencyFormatter(
												subTotal(values) || 0,
												values.currency
											)}
										</p>
										<p className="hstack mb-1">
											<span className="w-50">
												<label
													htmlFor="discount"
													className="d-block pe-2 text-secondary fw-lighter text-end">
													Discount
												</label>
											</span>
											<span className="w-50">
												<Field
													name="discount"
													id="discount"
													type="text"
													className="form-control p-1"
												/>
											</span>
										</p>
										<p className="hstack mb-1">
											<span className="w-50">
												<label
													htmlFor="tax"
													className="d-block pe-2 text-secondary fw-lighter text-end">
													Tax <button></button>
												</label>
											</span>
											<span className="w-50">
												<Field
													name="tax"
													id="tax"
													type="text"
													className="form-control p-1"
												/>
											</span>
										</p>
										<p className="hstack mb-1">
											<span className="w-50">
												<label
													htmlFor="shipping"
													className="d-block pe-2 text-secondary fw-lighter text-end">
													Shipping
												</label>
											</span>
											<span className="w-50">
												<Field
													name="shipping"
													id="shipping"
													type="text"
													className="form-control p-1"
												/>
											</span>
										</p>
										<p className="text-secondary fw-lighter text-end ">
											Total{" "}
											{currencyFormatter(
												subTotal(values) -
													Number(values?.discount) +
													Number(values?.tax) +
													Number(values?.shipping) ||
													0,
												values.currency
											)}
										</p>
										<p className="hstack mb-1">
											<span className="w-50">
												<label
													htmlFor="paid"
													className="d-block pe-2 text-secondary fw-lighter text-end">
													Amount Paid
												</label>
											</span>
											<span className="w-50">
												<Field
													name="paid"
													id="paid"
													type="text"
													className="form-control p-1"
												/>
											</span>
										</p>
										<p className="text-secondary fw-lighter text-end ">
											Balance due{" "}
											{currencyFormatter(
												subTotal(values) -
													Number(values?.discount) +
													Number(values?.tax) +
													Number(values?.shipping) -
													Number(values?.paid) || 0,
												values.currency
											)}
										</p>
									</Col>
								</Row>
							</Col>
							{/* <Col md="3">
								<button type="submit">Download</button>
								{subTotal(values) > 0 && (
									<PDFDownloadLink
										className="btn btn-primary"
										document={<PDFDoc data={values} />}
										fileName={
											`#${values?.bill_number}.pdf` ||
											"#invoice.pdf"
										}>
										{({ loading }) =>
											loading
												? "Loading document"
												: "↓ Download PDF"
										}
									</PDFDownloadLink>
								)}
							</Col>
 */}{" "}
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Invoice;
