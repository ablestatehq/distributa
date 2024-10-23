import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { currencyFormatter } from "../../../../utils/currency.formatter";
import SatoshiBold from "../../../../assets/fonts/satoshi/Satoshi-Bold.ttf";
import SatoshiRegular from "../../../../assets/fonts/satoshi/Satoshi-Regular.ttf";

Font.register({
  family: "Satoshi",
  fonts: [
    { src: SatoshiBold, fontWeight: 700, fontStyle: "normal" },
    { src: SatoshiRegular, fontWeight: 400, fontStyle: "normal" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 48,
    flexDirection: "column",
    rowGap: 48,
  },
  logo: {
    width: 96,
    height: 96,
    objectFit: "cover",
  },
  fontBold: {
    fontFamily: "Satoshi",
    fontWeight: "bold",
  },
  fontNormal: {
    fontFamily: "Satoshi",
    fontWeight: "normal",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// Create Document Component
const PDFDoc = ({ data, includeBorder = false }) => {
  const {
    logo,
    currency,
    billed_from: {
      name: biller_name,
      email: biller_email,
      address: biller_address,
    },
    billed_to: {
      name: client_name,
      email: client_email,
      address: client_address,
    },
    title,
    invoice_no,
    issue_date,
    due_date,
    items,
    sub_total,
    discount,
    tax,
    shipping,
    amount_due,
    amount_paid,
    balance_due,
    notes,
    terms,
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
        style={[
          styles.page,
          { borderWidth: 1 },
          includeBorder
            ? { borderStyle: "solid", borderColor: "#000" }
            : { border: "none" },
        ]}
      >
        <View style={[styles.header]}>
          <View>{logo ? <Image src={logo} style={styles.logo} /> : null}</View>
          <View style={[{ flexDirection: "column", gap: 4 }]}>
            <Text style={[styles.fontBold, { fontSize: 24 }]}>{title}</Text>
            <View
              style={[
                {
                  flexDirection: "column",
                  width: "auto",
                  alignItems: "flex-end",
                },
              ]}
            >
              <View styles={{ width: "auto" }}>
                <View style={{ flexDirection: "row", marginVertical: 1 }}>
                  <Text style={[styles.fontBold, { fontSize: 8 }]}>
                    Invoice #:{" "}
                  </Text>
                  <Text style={[styles.fontNormal, { fontSize: 8 }]}>
                    {invoice_no}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 1,
                    width: "auto",
                    rowGap: 1,
                  }}
                >
                  <Text style={[styles.fontBold, { fontSize: 8 }]}>
                    Date Issued:{" "}
                  </Text>
                  <Text style={[styles.fontNormal, { fontSize: 8 }]}>
                    {issue_date}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginVertical: 1,
                      width: "auto",
                      rowGap: 1,
                    },
                  ]}
                >
                  <Text style={[styles.fontBold, { fontSize: 8 }]}>
                    Due Date:{" "}
                  </Text>
                  <Text style={[styles.fontNormal, { fontSize: 8 }]}>
                    {due_date}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[{ flexDirection: "row", gap: 30 }]}>
          <View style={[{ flexDirection: "column", gap: 4 }]}>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 12, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              Billed From
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {biller_name}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {biller_address}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {biller_email}
            </Text>
          </View>
          <View style={[{ flexDirection: "column", gap: 4 }]}>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 12, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              Billed To
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {client_name}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {client_address}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
              ]}
            >
              {client_email}
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              // flexGrow: 1,
              flexDirection: "column",
              gap: 11,
            },
          ]}
        >
          <View
            style={[
              {
                flexDirection: "row",
                paddingVertical: 8,
                borderBottomStyle: "solid",
                borderBottomWidth: 0.75,
                borderBottomColor: "#000",
                borderTopStyle: "solid",
                borderTopWidth: 0.75,
                borderTopColor: "#000",
              },
            ]}
          >
            <Text
              style={[
                styles.fontBold,
                { fontSize: 10, lineHeight: 1, letterSpacing: 0, flex: 2 },
              ]}
            >
              Title
            </Text>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 10, lineHeight: 1, letterSpacing: 0, flex: 1 },
              ]}
            >
              Quantity
            </Text>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 10, lineHeight: 1, letterSpacing: 0, flex: 1 },
              ]}
            >
              Units
            </Text>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 10, lineHeight: 1, letterSpacing: 0, flex: 1 },
              ]}
            >
              Price
            </Text>
            <Text
              style={[
                styles.fontBold,
                { fontSize: 10, lineHeight: 1, letterSpacing: 0, flex: 1 },
              ]}
            >
              Amount
            </Text>
          </View>
          {items.map((item, index) => {
            const { title, quantity, units, price } = item;
            return (
              <View
                key={index}
                style={[
                  {
                    flexDirection: "row",
                    paddingVertical: 8,
                    borderBottomStyle: "solid",
                    borderBottomWidth: 0.75,
                    borderBottomColor: "#B8B8B8",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fontNormal,
                    { fontSize: 8, lineHeight: 1, letterSpacing: 0, flex: 2 },
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    { fontSize: 8, lineHeight: 1, letterSpacing: 0, flex: 1 },
                  ]}
                >
                  {quantity}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    { fontSize: 8, lineHeight: 1, letterSpacing: 0, flex: 1 },
                  ]}
                >
                  {units || "N/A"}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    { fontSize: 8, lineHeight: 1, letterSpacing: 0, flex: 1 },
                  ]}
                >
                  {currencyFormatter(price, currency)}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    { fontSize: 8, lineHeight: 1, letterSpacing: 0, flex: 1 },
                  ]}
                >
                  {currencyFormatter(
                    Number(price) * Number(quantity),
                    currency
                  )}
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              flexShrink: 0,
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            wrap={false}
            style={[{ flexDirection: "column", gap: 24, width: 192 }]}
          >
            <View style={[{ flexDirection: "column", gap: 4 }]}>
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: 12,
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Notes
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 9, lineHeight: 1.5, letterSpacing: 0 },
                ]}
              >
                {notes}
              </Text>
            </View>
            <View style={[{ flexDirection: "column", gap: 4 }]}>
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: 12,
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Terms & Conditions
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 9, lineHeight: 1.5, letterSpacing: 0 },
                ]}
              >
                {terms}
              </Text>
            </View>
          </View>
          <View style={[{ flexDirection: "column", minWidth: 153.5 }]}>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Sub Total
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {currencyFormatter(sub_total, currency)}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Discount
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {discount ? currencyFormatter(discount ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Tax
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {tax ? currencyFormatter(tax ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Shipping
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {shipping ? currencyFormatter(shipping ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Amount Due
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {currencyFormatter(amount_due ?? 0, currency)}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Amount Paid
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  { fontSize: 8, lineHeight: 1.2, letterSpacing: 0 },
                ]}
              >
                {currencyFormatter(amount_paid ?? 0, currency)}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                  alignItems: "flex-end",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 8, lineHeight: 1, letterSpacing: 0 },
                ]}
              >
                Balance Due
              </Text>
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: 12,
                    lineHeight: 1.2,
                    letterSpacing: 0,
                    verticalAlign: "sub",
                  },
                ]}
              >
                {currencyFormatter(balance_due ?? 0, currency)}
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
