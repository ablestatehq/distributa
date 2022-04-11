import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";
import PDFDoc from "./PDFDoc";
import { PDFDownloadLink } from "@react-pdf/renderer";
const initialValues = {
	logo:null,
	sender: "",
	receiver: "",
	shipping_address: "",
	bill_number: "",
	on_date: "",
	terms: "",
	due_date: "",
	po_number: "",
	other_terms: "",
	notes: "",
	discount: "",
	tax: "",
	shipping: "",
	paid: "",
	balance_due: "",
	items: [
		{
			title: "",
			qty: "",
			rate: "",
			amount: "",
		},
	],
};

const subTotal = (values) => {
	return values.items.reduce((acc, curr) => {
		return acc + parseInt(curr.amount);
	}, 0);
};
const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
    //   console.log(fileInfo);
    });
}

  const Invoice = () => {
	return (
		<>
			<h2>Generate Invoice</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
				}}>
				{({ values, setFieldValue}) => (
					<Form>
						<Row>
							<Col md="9">
								<Row className="mt-4 mb-4">
									<Col className="d-flex flex-column justify-content-end ps-0">
										<img src={values.logo} />
										<input
											type="file"
											accept="image/*"
											name="logo"
											className="form-control"
											placeholder="Logo"
											onChange={(e) => {
												// setFieldValue("logo", e.currentTarget.files[0].name);
												getBase64(e.currentTarget.files[0]).then(base64 => {
													setFieldValue("logo", base64);
													// console.log(base64)
												});
												// console.log(e.currentTarget.files[0].name)
											}}
										/>
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
											name="shipping_address"
										/>
									</Col>
									<Col className="d-flex flex-column justify-content-end pe-0">
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
													htmlFor="date"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													Date
												</label>
											</div>
											<div className="w-50">
												<Field
													type="date"
													name="on_date"
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
													type="text"
													name="due_date"
													className="p-1 form-control"
												/>
											</div>
										</div>
										<div className="hstack mb-1">
											<div className="w-50">
												<label
													htmlFor="terms"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													Terms
												</label>
											</div>
											<div className="w-50">
												<Field
													type="type"
													name="terms"
													className="p-1 form-control mw-50"
												/>
											</div>
										</div>
										<div className="hstack">
											<div className="w-50">
												<label
													htmlFor="terms"
													className="fs-6 text-muted d-block text-end fw-lighter pe-2">
													PO Box
												</label>
											</div>
											<div className="w-50">
												<Field
													type="type"
													name="po_number"
													className="p-1 form-control"
												/>
											</div>
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
															<Col
																md="2"
																className="p-2">
																{
																	(values.items[
																		index
																	].amount =
																		item.rate *
																		item.qty)
																}
																</Col>
																<Col md="1">
																{values.items.length > 1 &&
																<span
																	className="text-danger btn btn-sm d-block text-end"
																	onClick={() =>
																		remove(
																			index
																		)
																	}>
																	X
																</span>}
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
																qty: "",
																rate: "",
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
										<p><label
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
										/></p>
										<p className="mt-2">
										<label
											htmlFor="other_terms"
											className="text-secondary fw-lighter">
											Terms
										</label>
										<Field
											name="other_terms"
											id="other_terms"
											placeholder="Terms"
											as="textarea"
											className="form-control"
										/>
										</p>
									</Col>
									<Col className="p-0 m-0">
										<p className="text-secondary fw-lighter text-end ">
											Sub Total {subTotal(values) || 0}
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
													Tax
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
											Total {subTotal(values) || 0}
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
											Balance due {subTotal(values) || 0}
										</p>
									</Col>
								</Row>
							</Col>
							<Col md="3">
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
						</Row>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Invoice;
