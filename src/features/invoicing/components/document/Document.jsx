import React, { useState, useEffect, useMemo } from "react";
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

// Register fonts once at module level
Font.register({
  family: "Satoshi",
  fonts: [
    { src: SatoshiBold, fontWeight: 700, fontStyle: "normal" },
    { src: SatoshiRegular, fontWeight: 400, fontStyle: "normal" },
  ],
});

// Helper function for Figma to PDF point conversion
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
  columnGap4: {
    flexDirection: "column",
    gap: figmaToReactPdfPoints(4),
  },
  columnGap24: {
    flexDirection: "column",
    gap: figmaToReactPdfPoints(24),
  },
  rowGap30: {
    flexDirection: "row",
    gap: figmaToReactPdfPoints(30),
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  flexRow: {
    flexDirection: "row",
  },
  marginVertical1: {
    marginVertical: figmaToReactPdfPoints(1),
  },
  title: {
    fontSize: figmaToReactPdfPoints(24),
  },
  sectionTitle: {
    fontSize: figmaToReactPdfPoints(12),
    lineHeight: 1,
    letterSpacing: 0,
  },
  labelText: {
    fontSize: figmaToReactPdfPoints(8),
    lineHeight: 1,
    letterSpacing: 0,
  },
  normalText: {
    fontSize: figmaToReactPdfPoints(8),
    lineHeight: 1,
    letterSpacing: 0,
  },
  smallText: {
    fontSize: figmaToReactPdfPoints(6),
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: figmaToReactPdfPoints(8),
    borderBottomStyle: "solid",
    borderBottomWidth: 0.75,
    borderBottomColor: "#000",
    borderTopStyle: "solid",
    borderTopWidth: 0.75,
    borderTopColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: figmaToReactPdfPoints(8),
    borderBottomStyle: "solid",
    borderBottomWidth: 0.75,
    borderBottomColor: "#B8B8B8",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: figmaToReactPdfPoints(8),
  },
  summaryRowBorder: {
    borderBottomStyle: "solid",
    borderBottomWidth: 0.75,
    borderBottomColor: "#B8B8B8",
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  minWidth153: {
    minWidth: figmaToReactPdfPoints(153.5),
  },
  width192: {
    width: figmaToReactPdfPoints(192),
  },
  balanceDueText: {
    fontSize: figmaToReactPdfPoints(12),
    lineHeight: 1.2,
    letterSpacing: 0,
    verticalAlign: "sub",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },
});

// Header component with logo and invoice details
const InvoiceHeader = React.memo(
  ({ logo, title, invoice_no, issue_date, due_date }) => (
    <View style={styles.header}>
      <View>{logo ? <Image src={logo} style={styles.logo} /> : null}</View>
      <View style={styles.columnGap4}>
        <Text style={[styles.fontBold, styles.title]}>{title}</Text>
        <View style={[{ flexDirection: "column", alignItems: "flex-end" }]}>
          <View>
            <View style={[styles.flexRow, styles.marginVertical1]}>
              <Text style={[styles.fontBold, styles.labelText]}>
                Invoice #:{" "}
              </Text>
              <Text style={[styles.fontNormal, styles.labelText]}>
                {invoice_no}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.marginVertical1]}>
              <Text style={[styles.fontBold, styles.labelText]}>
                Date Issued:{" "}
              </Text>
              <Text style={[styles.fontNormal, styles.labelText]}>
                {issue_date ? format(issue_date, "dd-MM-yyyy") : "N/A"}
              </Text>
            </View>
            <View style={[styles.flexRow, styles.marginVertical1]}>
              <Text style={[styles.fontBold, styles.labelText]}>
                Due Date:{" "}
              </Text>
              <Text style={[styles.fontNormal, styles.labelText]}>
                {due_date ? format(due_date, "dd-MM-yyyy") : "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
);

// Billing section component
const BillingSection = React.memo(({ title, name, email, address }) => (
  <View style={styles.columnGap4}>
    <Text style={[styles.fontBold, styles.sectionTitle]}>{title}</Text>
    <Text style={[styles.fontNormal, styles.normalText]}>{name}</Text>
    <Text style={[styles.fontNormal, styles.normalText]}>{address}</Text>
    <Text style={[styles.fontNormal, styles.normalText]}>{email}</Text>
  </View>
));

// Billing information component
const BillingInfo = React.memo(({ billed_from, billed_to }) => (
  <View style={styles.rowGap30}>
    <BillingSection
      title="Billed From"
      name={billed_from.name}
      email={billed_from.email}
      address={billed_from.address}
    />
    <BillingSection
      title="Billed To"
      name={billed_to.name}
      email={billed_to.email}
      address={billed_to.address}
    />
  </View>
));

// Table header component
const TableHeader = React.memo(() => (
  <View style={styles.tableHeader}>
    <Text style={[styles.fontBold, styles.normalText, styles.flex2]}>Item</Text>
    <Text style={[styles.fontBold, styles.normalText, styles.flex1]}>
      Quantity
    </Text>
    <Text style={[styles.fontBold, styles.normalText, styles.flex1]}>
      Units
    </Text>
    <Text style={[styles.fontBold, styles.normalText, styles.flex1]}>
      Price
    </Text>
    <Text style={[styles.fontBold, styles.normalText, styles.flex1]}>
      Amount
    </Text>
  </View>
));

// Table row component
const TableRow = React.memo(({ item, currency }) => {
  const { title, quantity, units, price } = item;
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.fontNormal, styles.normalText, styles.flex2]}>
        {title}
      </Text>
      <Text style={[styles.fontNormal, styles.normalText, styles.flex1]}>
        {quantity}
      </Text>
      <Text style={[styles.fontNormal, styles.normalText, styles.flex1]}>
        {units || "N/A"}
      </Text>
      <Text style={[styles.fontNormal, styles.normalText, styles.flex1]}>
        {currency ? currencyFormatter(price, currency) : "N/A"}
      </Text>
      <Text style={[styles.fontNormal, styles.normalText, styles.flex1]}>
        {currency
          ? currencyFormatter(Number(price) * Number(quantity), currency)
          : "N/A"}
      </Text>
    </View>
  );
});

// Items table component
const ItemsTable = React.memo(({ items, currency }) => (
  <View style={{ flexDirection: "column", gap: figmaToReactPdfPoints(11) }}>
    <TableHeader />
    {items.map((item, index) => (
      <TableRow key={index} item={item} currency={currency} />
    ))}
  </View>
));

// Summary row component
const SummaryRow = React.memo(
  ({
    label,
    value,
    currency,
    isBold = false,
    isLarge = false,
    hasBorder = false,
  }) => (
    <View
      style={[
        styles.summaryRow,
        hasBorder && styles.summaryRowBorder,
        isLarge && styles.alignItemsEnd,
      ]}
    >
      <Text style={[styles.fontBold, styles.normalText]}>{label}</Text>
      <Text
        style={[
          isBold ? styles.fontBold : styles.fontNormal,
          isLarge ? styles.balanceDueText : styles.normalText,
        ]}
      >
        {currency ? currencyFormatter(value ?? 0, currency) : "N/A"}
      </Text>
    </View>
  )
);

// Invoice summary component
const InvoiceSummary = React.memo(
  ({
    currency,
    sub_total,
    discount,
    tax,
    shipping,
    amount_due,
    amount_paid,
    balance_due,
  }) => (
    <View style={styles.minWidth153}>
      <SummaryRow
        label="Sub Total"
        value={sub_total}
        currency={currency}
        hasBorder={true}
      />
      <SummaryRow label="Discount" value={discount} currency={currency} />
      <SummaryRow label="Tax" value={tax} currency={currency} />
      <SummaryRow
        label="Shipping"
        value={shipping}
        currency={currency}
        hasBorder={true}
      />
      <SummaryRow
        label="Amount Due"
        value={amount_due}
        currency={currency}
        hasBorder={true}
      />
      <SummaryRow
        label="Amount Paid"
        value={amount_paid}
        currency={currency}
        hasBorder={true}
      />
      <SummaryRow
        label="Balance Due"
        value={balance_due}
        currency={currency}
        isBold={true}
        isLarge={true}
        hasBorder={true}
      />
    </View>
  )
);

// Notes and terms component
const NotesAndTerms = React.memo(({ notes, terms }) => (
  <View style={[styles.columnGap24, styles.width192]} wrap={false}>
    {notes ? (
      <View style={styles.columnGap4}>
        <Text style={[styles.fontBold, styles.sectionTitle]}>Notes</Text>
        <Text style={[styles.fontNormal, styles.smallText]}>{notes}</Text>
      </View>
    ) : null}
    {terms ? (
      <View style={styles.columnGap4}>
        <Text style={[styles.fontBold, styles.sectionTitle]}>
          Terms & Conditions
        </Text>
        <Text style={[styles.fontNormal, styles.smallText]}>{terms}</Text>
      </View>
    ) : null}
  </View>
));

// Footer component with notes, terms and summary
const InvoiceFooter = React.memo(({ notes, terms, summaryData }) => (
  <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
    <NotesAndTerms notes={notes} terms={terms} />
    <InvoiceSummary {...summaryData} />
  </View>
));

// Main PDFDoc component
const PDFDoc = React.memo(({ data, includeBorder = false }) => {
  const [size, setSize] = useState("");
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    setSize(data?.paper_size || "A4");
    setOrientation(data?.orientation || "portrait");
  }, [data]);

  // Extract billing information
  const billingInfo = useMemo(
    () => ({
      billed_from: data.billed_from,
      billed_to: data.billed_to,
    }),
    [data.billed_from, data.billed_to]
  );

  // Extract summary data
  const summaryData = useMemo(
    () => ({
      currency: data.currency,
      sub_total: data.sub_total,
      discount: data.discount,
      tax: data.tax,
      shipping: data.shipping,
      amount_due: data.amount_due,
      amount_paid: data.amount_paid,
      balance_due: data.balance_due,
    }),
    [
      data.currency,
      data.sub_total,
      data.discount,
      data.tax,
      data.shipping,
      data.amount_due,
      data.amount_paid,
      data.balance_due,
    ]
  );

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
        <InvoiceHeader
          logo={data.logo}
          title={data.title}
          invoice_no={data.invoice_no}
          issue_date={data.issue_date}
          due_date={data.due_date}
        />

        <BillingInfo
          billed_from={billingInfo.billed_from}
          billed_to={billingInfo.billed_to}
        />

        <ItemsTable items={data.items} currency={data.currency} />

        <InvoiceFooter
          notes={data.notes}
          terms={data.terms}
          summaryData={summaryData}
        />
      </Page>
    </Document>
  );
});

export default PDFDoc;
