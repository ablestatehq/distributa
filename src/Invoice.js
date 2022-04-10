import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";
import PDFDoc from "./PDFDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";
const initialValues = {
	sender: "",
	receiver: "",
	shipping: "",
	bill_number: "",
	on_date: "",
	terms: "",
	due_date: "",
	po_number: "",
	items: [
		{
			title: "",
			qty: 0,
			rate: 0,
			amount: 0,
		},
	],
};

const Invoice = () => (
	<div>
		<h2>Generate Invoice</h2>
		<Formik
			initialValues={initialValues}
			onSubmit={async (values) => {
				await new Promise((r) => setTimeout(r, 500));
				alert(JSON.stringify(values, null, 2));
			}}>
			{({ values }) => (
				<Form>
					<Row>
						<Col md="9">
							<Row className="mt-4 mb-4">
								<Col className="d-flex flex-column justify-content-end">
									Logo
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
										placeholder="Shipping details"
										className="form-control"
										name="shipping"
									/>
								</Col>
								<Col className="d-flex flex-column justify-content-end">
									<div className="d-flex flex-row justify-content-between">
										<label htmlFor="bill_number">Number</label>
										<Field
											type="text"
											name="bill_number"
											className="p-0 form-control"
										/>
									</div>
									<div className="d-flex flex-row justify-content-between">

									<label htmlFor="date">Date</label>
									<Field
										type="date"
										name="date"
										className="p-0 form-control"
									/>
									</div>
									<div className="d-flex flex-row justify-content-between">

									<label htmlFor="date">Due Date</label>
									<Field
										type="text"
										name="due_date"
										className="p-1 form-control"
									/>
									</div>
									<div className="d-flex flex-row justify-content-between">

										<label htmlFor="terms">Terms</label>
										<Field
											type="type"
											name="terms"
											className="p-1 form-control"
										/>
										</div>
										<div className="d-flex flex-row justify-content-between">

										<label htmlFor="terms">PO Box</label>
										<Field
											type="type"
											name="po_number"
											className="p-1 form-control"
										/>
									</div>
									</Col>
							</Row>
							<Row className="bg-dark text-light rounded">
								<Col md="7">Title</Col>
								<Col md="1">Qty</Col>
								<Col md="2">Rate</Col>
								<Col md="2">Amount</Col>
							</Row>
							<FieldArray name="items">
								{({ insert, remove, push }) => (
									<>
										{values.items.length > 0 &&
											values.items.map((item, index) => (
												<Row
													key={index}
													className="my-1">
													<Col
														md="7"
														className="px-0">
														<Field
															name={`items.${index}.title`}
															placeholder="Shoes"
															type="text"
															className="p-1 form-control"
														/>
														<ErrorMessage
															name={`items.${index}.title`}
															component="div"
															className="field-error"
														/>
													</Col>
													<Col
														md="1"
														className="px-0">
														<Field
															name={`items.${index}.qty`}
															placeholder="ex:4"
															type="text"
															className="p-1 form-control"
														/>
														<ErrorMessage
															name={`items.${index}.qty`}
															component="div"
															className="field-error"
														/>
													</Col>
													<Col
														md="2"
														className="px-0">
														<Field
															name={`items.${index}.rate`}
															placeholder="400"
															type="text"
															className="p-1 form-control"
														/>
														<ErrorMessage
															name={`items.${index}.rate`}
															component="div"
															className="field-error"
														/>
													</Col>
													<Col md="2" className="p-2">
														{
															(values.items[
																index
															].amount =
																item.rate *
																item.qty)
														}
														<span
															className="secondary"
															onClick={() =>
																remove(index)
															}>
															X
														</span>
													</Col>
												</Row>
											))}
										<Row>
											<Col>
												<span
													className="secondary"
													onClick={() =>
														push({
															product: "",
															qty: 0,
															rate: 0,
															amount: 0,
														})
													}>
													Add item
												</span>
											</Col>
										</Row>
									</>
								)}
							</FieldArray>
							<div>
								Grand Total
								{values.items.reduce(
									(accumulator, item) =>
										accumulator + item.amount,
									0
								)}
							</div>
						</Col>
						<Col md="3">
							{/* <button type="submit">Download</button> */}
							{values.items.reduce((accumulator, item) => accumulator + item.amount,0) > 0 && <PDFDownloadLink document={<PDFDoc data={values}/>} fileName={`#${values?.bill_number}.pdf` || '#invoice.pdf'}>
								{({loading}) => (loading ? "Loading document" : "Download")}
							</PDFDownloadLink> }
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	</div>
);

export default Invoice;
