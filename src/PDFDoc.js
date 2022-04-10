import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
  const [size, setSize] = React.useState('');
  const [orientation, setOrientation] = React.useState('');
  React.useEffect(()=>{
    setSize(data?.size || 'A4');
    setOrientation(data?.orientation || 'horizontal');

  },[data]);
  return (<Document>
    <Page size={size} orientation={orientation} style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
      {
        data.items.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text>{item.title}</Text>
            <Text>{item.amount}</Text>
          </View>
        ))
      }
    </Page>
  </Document>)
};

export default PDFDoc;
// ReactPDF.render(<PDFDoc />, `downloads/example.pdf`);
