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
import { format } from "date-fns";

Font.register({
  family: "Satoshi",
  fonts: [
    { src: SatoshiBold, fontWeight: 700, fontStyle: "normal" },
    { src: SatoshiRegular, fontWeight: 400, fontStyle: "normal" },
  ],
});

const figmaToReactPdfPoints = (figmaPixels) => (figmaPixels * 0.75).toFixed(2);

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: figmaToReactPdfPoints(48),
    flexDirection: "column",
    rowGap: figmaToReactPdfPoints(48),
  },
  logo: {
    width: figmaToReactPdfPoints(96),
    height: figmaToReactPdfPoints(96),
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
    setSize(data?.paper_size || "A4");
    setOrientation(data?.orientation || "portrait");
  }, [data]);

  return (
    <Document>
      <Page
        size={size}
        orientation={orientation}
        style={[
          styles.page,
          { borderWidth: 1 },
          includeBorder ? { borderStyle: "solid", borderColor: "#000" } : {},
        ]}
      >
        <View style={[styles.header]}>
          <View>{logo ? <Image src={logo} style={styles.logo} /> : null}</View>
          <View
            style={[{ flexDirection: "column", gap: figmaToReactPdfPoints(4) }]}
          >
            <Text
              style={[styles.fontBold, { fontSize: figmaToReactPdfPoints(24) }]}
            >
              {title}
            </Text>
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
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: figmaToReactPdfPoints(1),
                  }}
                >
                  <Text
                    style={[
                      styles.fontBold,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    Invoice #:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.fontNormal,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    {invoice_no}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: figmaToReactPdfPoints(1),
                    width: "auto",
                    rowGap: figmaToReactPdfPoints(1),
                  }}
                >
                  <Text
                    style={[
                      styles.fontBold,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    Date Issued:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.fontNormal,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    {issue_date ? format(issue_date, "dd-MM-yyyy") : "N/A"}
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
                  <Text
                    style={[
                      styles.fontBold,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    Due Date:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.fontNormal,
                      { fontSize: figmaToReactPdfPoints(8) },
                    ]}
                  >
                    {due_date ? format(due_date, "dd-MM-yyyy") : "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[{ flexDirection: "row", gap: figmaToReactPdfPoints(30) }]}
        >
          <View
            style={[{ flexDirection: "column", gap: figmaToReactPdfPoints(4) }]}
          >
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(12),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              Billed From
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {biller_name}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {biller_address}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {biller_email}
            </Text>
          </View>
          <View
            style={[{ flexDirection: "column", gap: figmaToReactPdfPoints(4) }]}
          >
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(12),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              Billed To
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {client_name}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {client_address}
            </Text>
            <Text
              style={[
                styles.fontNormal,
                {
                  fontSize: figmaToReactPdfPoints(8),
                  lineHeight: 1,
                  letterSpacing: 0,
                },
              ]}
            >
              {client_email}
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              // flex: 1,
              flexDirection: "column",
              gap: figmaToReactPdfPoints(11),
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
                {
                  fontSize: figmaToReactPdfPoints(10),
                  lineHeight: 1,
                  letterSpacing: 0,
                  flex: 2,
                },
              ]}
            >
              Item
            </Text>
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(10),
                  lineHeight: 1,
                  letterSpacing: 0,
                  flex: 1,
                },
              ]}
            >
              Quantity
            </Text>
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(10),
                  lineHeight: 1,
                  letterSpacing: 0,
                  flex: 1,
                },
              ]}
            >
              Units
            </Text>
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(10),
                  lineHeight: 1,
                  letterSpacing: 0,
                  flex: 1,
                },
              ]}
            >
              Price
            </Text>
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: figmaToReactPdfPoints(10),
                  lineHeight: 1,
                  letterSpacing: 0,
                  flex: 1,
                },
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
                    paddingVertical: figmaToReactPdfPoints(8),
                    borderBottomStyle: "solid",
                    borderBottomWidth: 0.75,
                    borderBottomColor: "#B8B8B8",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fontNormal,
                    {
                      fontSize: figmaToReactPdfPoints(8),
                      lineHeight: 1,
                      letterSpacing: 0,
                      flex: 2,
                    },
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    {
                      fontSize: figmaToReactPdfPoints(8),
                      lineHeight: 1,
                      letterSpacing: 0,
                      flex: 1,
                    },
                  ]}
                >
                  {quantity}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    {
                      fontSize: figmaToReactPdfPoints(8),
                      lineHeight: 1,
                      letterSpacing: 0,
                      flex: 1,
                    },
                  ]}
                >
                  {units || "N/A"}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    {
                      fontSize: figmaToReactPdfPoints(8),
                      lineHeight: 1,
                      letterSpacing: 0,
                      flex: 1,
                    },
                  ]}
                >
                  {currency ? currencyFormatter(price, currency) : "N/A"}
                </Text>
                <Text
                  style={[
                    styles.fontNormal,
                    {
                      fontSize: figmaToReactPdfPoints(8),
                      lineHeight: 1,
                      letterSpacing: 0,
                      flex: 1,
                    },
                  ]}
                >
                  {currency
                    ? currencyFormatter(
                        Number(price) * Number(quantity),
                        currency
                      )
                    : "N/A"}
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
            style={[
              {
                flexDirection: "column",
                gap: figmaToReactPdfPoints(24),
                width: 192,
              },
            ]}
          >
            {notes ? (
              <View style={[{ flexDirection: "column", gap: 4 }]}>
                <Text
                  style={[
                    styles.fontBold,
                    {
                      fontSize: figmaToReactPdfPoints(12),
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
                    {
                      fontSize: figmaToReactPdfPoints(6),
                      lineHeight: 1.5,
                      letterSpacing: 0,
                    },
                  ]}
                >
                  {notes}
                </Text>
              </View>
            ) : null}
            {terms ? (
              <View style={[{ flexDirection: "column", gap: 4 }]}>
                <Text
                  style={[
                    styles.fontBold,
                    {
                      fontSize: figmaToReactPdfPoints(12),
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
                    {
                      fontSize: figmaToReactPdfPoints(6),
                      lineHeight: 1.5,
                      letterSpacing: 0,
                    },
                  ]}
                >
                  {terms}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={[
              {
                flexDirection: "column",
                minWidth: figmaToReactPdfPoints(153.5),
              },
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Sub Total
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency ? currencyFormatter(sub_total, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Discount
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency ? currencyFormatter(discount ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Tax
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency ? currencyFormatter(tax ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Shipping
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency ? currencyFormatter(shipping ?? 0, currency) : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Amount Due
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency
                  ? currencyFormatter(amount_due ?? 0, currency)
                  : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
                  borderBottomStyle: "solid",
                  borderBottomWidth: 0.75,
                  borderBottomColor: "#B8B8B8",
                },
              ]}
            >
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Amount Paid
              </Text>
              <Text
                style={[
                  styles.fontNormal,
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                  },
                ]}
              >
                {currency
                  ? currencyFormatter(amount_paid ?? 0, currency)
                  : "N/A"}
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: figmaToReactPdfPoints(8),
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
                  {
                    fontSize: figmaToReactPdfPoints(8),
                    lineHeight: 1,
                    letterSpacing: 0,
                  },
                ]}
              >
                Balance Due
              </Text>
              <Text
                style={[
                  styles.fontBold,
                  {
                    fontSize: figmaToReactPdfPoints(12),
                    lineHeight: 1.2,
                    letterSpacing: 0,
                    verticalAlign: "sub",
                  },
                ]}
              >
                {currency
                  ? currencyFormatter(balance_due ?? 0, currency)
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDoc;
