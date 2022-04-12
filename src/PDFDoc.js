import React from 'react';
import { Page, Text, Image,View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const PDFDoc = ({data}) => {
  const {logo, sender, receiver, shipping_address, bill_number, on_date, terms, due_date, po_number, other_terms, notes,discount, tax, shipping, paid, balance_due, items } = data
  const [size, setSize] = React.useState('');
  const [orientation, setOrientation] = React.useState('');
  React.useEffect(()=>{
    setSize(data?.size || 'A4');
    setOrientation(data?.orientation || 'horizontal');

  },[data]);
  return (<Document>
    <Page size={size} orientation={orientation} style={styles.page}>
      <View style={styles.section}>
        <Text><Image src={logo} /></Text>
        <Text>{receiver}</Text>
        <Text>{sender}</Text>
        <Text>{shipping_address}</Text>
        <Text>{bill_number}</Text>
        <Text>{on_date}</Text>
        <Text>{terms}</Text>
        <Text>{due_date}</Text>
        <Text>{po_number}</Text>
        <Text>{other_terms}</Text>
        <Text>{notes}</Text>
        <Text>{discount}</Text>
        <Text>{tax}</Text>
        <Text>{shipping}</Text>
        <Text>{balance_due}</Text>
        <Text>{paid}</Text>
      </View>
      {
        items.map((item, index) => {
          const {title, quantity, rate, amount} = item
          return (
          <View key={index} style={styles.section}>
            <Text>{title}</Text>
            <Text>{quantity}</Text>
            <Text>{rate}</Text>
            <Text>{amount}</Text>
          </View>
        )})
      }
    </Page>
  </Document>)
};

export default PDFDoc;
// ReactPDF.render(<PDFDoc />, `downloads/example.pdf`);
