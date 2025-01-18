import  { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const GoldPriceCalculator = () => {
  const [grams, setGrams] = useState('');
  const [carat, setCarat] = useState('20');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(1500);
  const [grandTotal, setGrandTotal] = useState(0);
  const [error, setError] = useState('');
  const goldRates = {
    20: 7964,
  };

  const calculatePrice = () => {
    const goldRate = goldRates[carat];
    if (!grams || isNaN(grams) || grams <= 0) {
      setError('Please enter a valid weight in grams!');
      return;
    }
    setError('');
    const totalPrice = parseFloat(grams) * goldRate;
    setPrice(totalPrice);
  
    // Calculate 1.5% discount
    const discount = totalPrice * 0.015;
    setDiscount(discount);
  
    const discountedPrice = totalPrice - discount;
    setGrandTotal(discountedPrice);
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gold Price Calculator</Text>

      <Text style={styles.label}>Enter weight (grams):</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="e.g., 10"
        keyboardType="numeric"
        value={grams}
        onChangeText={(value) => {
          setGrams(value);
          setError('');
        }}
      />

      <Text style={styles.label}> Carat: 20</Text>
      <TouchableOpacity style={styles.button} onPress={calculatePrice}>
        <Text style={styles.buttonText}>Calculate Price</Text>
      </TouchableOpacity>

      {price > 0 && (
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal</Text>
            <Text style={styles.paymentValue}>₹{price.toLocaleString()}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Discount</Text>
            <Text style={styles.paymentValue}>
              ₹{discount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalValue}>
              ₹{grandTotal.toLocaleString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000000',
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  paymentDetails: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 15,
  },
  paymentValue: {
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 8,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 600,
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 600,
  },
});

export default GoldPriceCalculator;
