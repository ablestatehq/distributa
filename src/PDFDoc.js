import React from "react";
import {
	Page,
	Text,
	Image,
	View,
	Document,
	StyleSheet,
} from "@react-pdf/renderer";
import { currencyFormatter } from "./currency.formatter";

// Create styles
const styles = StyleSheet.create({
	debug: {
		padding: 5,
		border: "1px solid red",
	},
	page: {
		fontWeight: "light",
		color: "#999",
	},
	header: {
		flexDirection: "row",
		marginTop: 25,
		marginBottom: 10,
		marginHorizontal: 50,
	},
	header_col: {
		flex: 1,
		flexDirection: "column",
		// alignItems: "end",
		justifyContent: "flex-end",
	},
	header_col_content: {
		marginBottom: 10,
	},
	header_heading: {
		marginBottom: 5,
	},
	logo: {
		width: "100px",
		height: "auto",
		marginBottom: 10,
	},
	items_header: {
		backgroundColor: "#000000",
		flexDirection: "row",
		borderRadius: 5,
		paddingHorizontal: 5,
		color: "#ffffff",
		textTransform: "uppercase",
		marginHorizontal: 50,
	},
	item_row: {
		flexDirection: "row",
		marginHorizontal: 50,
		paddingHorizontal: 5,
	},
	item: {
		paddingVertical: 5,
	},
	footer: {
		flexDirection: "row",
		margin: 50,
	},
	marginBottom: {
		marginBottom: 5,
	},
	flex_grow: {
		flexGrow: 1,
	},
	flex_big_col: {
		flex: 2,
	},
	flex_1: {
		flex: 1,
		textAlign: "center",
	},
	border_b: {
		borderBottom: "1px solid #999",
	},
	col: {
		flexDirection: "column",
	},
	itemsDown: {
		justifyContent: "flex-end",
	},
	textLeft: {
		textAlign: "Left",
	},
	textRight: {
		textAlign: "right",
	},
	fs_small: {
		fontSize: 8,
	},
	fw_bold: {
		fontWeight: "bold",
	},
	text_xl: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
		textTransform: "uppercase",
	},
});

// Create Document Component
const PDFDoc = ({ data }) => {
	const {
		logo,
		sender,
		receiver,
		shipping_address,
		title,
		bill_number,
		issue_date,
		terms,
		due_date,
		notes,
		discount,
		tax,
		shipping,
		paid,
		items,
		currency,
	} = data;
	const [size, setSize] = React.useState("");
	const [orientation, setOrientation] = React.useState("");
	React.useEffect(() => {
		setSize(data?.size || "A4");
		setOrientation(data?.orientation || "landscape");
	}, [data]);
	return (
		<Document>
			<Page
				size={size}
				orientation={orientation}
				style={[styles.page, styles.fs_small]}>
				<View style={styles.header}>
					<View style={styles.header_col}>
						<View style={styles.logo}>
							{logo ? (
								<Image src={logo} width="50" height="50" />
							) : null}
						</View>
						<View style={styles.header_col_content}>
							{/* 					<Text
								style={[styles.header_heading, styles.fw_bold]}>
								From
							</Text> */}
							<Text>{sender}</Text>
						</View>
						<View style={styles.header_col_content}>
							{/* 	<Text
								style={[styles.header_heading, styles.fw_bold]}>
								To
							</Text> */}
							<Text>{receiver}</Text>
						</View>
					</View>
					<View style={styles.header_col}>
						<View>
							{shipping_address ? (
								<>
									<Text
										style={[
											styles.header_heading,
											styles.fw_bold,
										]}>
										Shipping address
									</Text>
									<Text>{shipping_address}</Text>
								</>
							) : null}
						</View>
					</View>
					<View style={[styles.header_col]}>
						<Text
							style={[
								styles.marginBottom,
								styles.text_xl,
								styles.textRight,
							]}>
							{title}
						</Text>
						<Text style={[styles.marginBottom, styles.textRight]}>
							#{bill_number}
						</Text>
						<Text style={[styles.marginBottom, styles.textRight]}>
							Date: {issue_date}
						</Text>
						{due_date ? (
							<Text
								style={[styles.marginBottom, styles.textRight]}>
								Due date: {due_date}
							</Text>
						) : null}
					</View>
				</View>
				<View style={styles.items_header}>
					<Text style={[styles.item, styles.flex_big_col]}>
						Title
					</Text>
					<Text style={[styles.item, styles.flex_1]}>Quantity</Text>
					<Text style={[styles.item, styles.flex_1]}>Units</Text>
					<Text style={[styles.item, styles.flex_1]}>Price</Text>
					<Text style={[styles.item, styles.flex_1]}>Amount</Text>
				</View>
				{items.map((item, index) => {
					const { title, quantity, measurement, price, amount } =
						item;
					return (
						<View
							key={index}
							style={[styles.item_row, styles.border_b]}>
							<Text style={[styles.item, styles.flex_big_col]}>
								{title}
							</Text>
							<Text style={[styles.item, styles.flex_1]}>
								{quantity}
							</Text>
							<Text style={[styles.item, styles.flex_1]}>
								{measurement || "None"}
							</Text>
							<Text
								style={[
									styles.item,
									styles.flex_1,
									styles.fs_small,
								]}>
								{currencyFormatter(price, currency)}
							</Text>
							<Text
								style={[
									styles.item,
									styles.flex_1,
									styles.fs_small,
								]}>
								{currencyFormatter(amount, currency)}
							</Text>
						</View>
					);
				})}
				<View style={styles.footer}>
					<View style={[styles.flex_1, styles.col, styles.itemsDown]}>
						{notes ? (
							<View style={styles.marginBottom}>
								<Text
									style={[
										styles.marginBottom,
										styles.textLeft,
									]}>
									Notes
								</Text>
								<Text style={[styles.textLeft]}>{notes}</Text>
							</View>
						) : null}
						{terms ? (
							<View>
								<Text
									style={[
										styles.marginBottom,
										styles.textLeft,
									]}>
									Terms
								</Text>
								<Text style={[styles.textLeft]}>{terms}</Text>
							</View>
						) : null}
					</View>
					<View style={[styles.flex_1, styles.col, styles.itemsDown]}>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Sub total{" "}
								{currencyFormatter(
									items.reduce(
										(acc, item) => acc + item.amount,
										0
									) || 0,
									currency
								)}
							</Text>
						</View>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Discount:{" "}
								{currencyFormatter(discount || 0, currency)}
							</Text>
						</View>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Tax: {currencyFormatter(tax || 0, currency)}
							</Text>
						</View>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Shipping:{" "}
								{currencyFormatter(shipping || 0, currency)}
							</Text>
						</View>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Paid Amount:{" "}
								{currencyFormatter(paid || 0, currency)}
							</Text>
						</View>
						<View style={[styles.marginBottom]}>
							<Text style={styles.textRight}>
								Balance Due:{" "}
								{currencyFormatter(
									Number(
										items.reduce(
											(acc, cur) => acc + cur.amount,
											0
										)
									) +
										Number(tax) +
										Number(shipping) -
										Number(discount) -
										Number(paid) || 0,
									currency
								)}
							</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default PDFDoc;
// ReactPDF.render(<PDFDoc />, `downloads/example.pdf`);
