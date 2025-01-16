import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';

const Final = ({ route }) => {
  const sheetUrl = `${Constants.expoConfig.extra.SHEET_URL}`;
  const noUrl = `${Constants.expoConfig.extra.WHATSAPP_NO}`;
  const { cartItems, subtotal, discount, grandTotal } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', username: '' });

  const validateFields = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', username: '' };

    if (!name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required.';
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
      valid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) {
      return;
    }

    const products = cartItems.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      name,
      phone,
      username,
      cartItems: products,
      subtotal,
      discount,
      grandTotal,
    };

    try {
      const response = await fetch(`${sheetUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        const whatsappMessage = `Hi, I would like to place an order:
Name: ${name}
Phone: ${phone}
Username: ${username}
Order Summary:
- Subtotal: ₹${subtotal}
- Discount: ₹${discount}
- Grand Total: ₹${grandTotal}

Product Details:
${products
  .map(
    (item) =>
      `• ${item.title} - Qty: ${item.quantity}, Price: ₹${
        item.quantity * item.price
      }`
  )
  .join('\n')}`;

        const whatsappUrl = `https://wa.me/${noUrl}?text=${encodeURIComponent(
          whatsappMessage
        )}`;

        await Linking.openURL(whatsappUrl);

        Alert.alert('Order Placed', 'Your order has been placed successfully!');
      } else {
        Alert.alert(
          'Error',
          'There was an issue placing your order. Please try again.'
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Cart Summary</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={[
              styles.input,
              errors.name && { borderColor: 'red', borderWidth: 0.5 },
            ]}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Phone*</Text>
          <TextInput
            style={[
              styles.input,
              errors.phone && { borderColor: 'red', borderWidth: 0.5 },
            ]}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            placeholderTextColor="#aaa"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Username*</Text>
          <TextInput
            style={[
              styles.input,
              errors.username && { borderColor: 'red', borderWidth: 0.5 },
            ]}
            placeholder="Enter your username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) setErrors({ ...errors, username: '' });
            }}
          />
          {errors.username ? (
            <Text style={styles.errorText}>{errors.username}</Text>
          ) : null}
        </View>

        <Text style={styles.subheading}>Order Summary</Text>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Items in Cart</Text>
          <Text style={styles.summaryValue}>{cartItems.length}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>₹{discount}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Grand Total</Text>
          <Text style={styles.summaryValue}>₹{grandTotal}</Text>
        </View>

        <Text style={styles.subheading}>Product Details</Text>

        <View style={[styles.cartItem, styles.cartItemHeader]}>
          <Text style={[styles.cartItemText, styles.cartItemColumn]}>
            Product Name
          </Text>
          <Text style={[styles.cartItemText, styles.cartItemColumn]}>
            Quantity
          </Text>
          <Text style={[styles.cartItemText, styles.cartItemColumn]}>
            Price
          </Text>
        </View>

        {cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={[styles.cartItemText, styles.cartItemColumn]}>
              {item.title}
            </Text>
            <Text style={[styles.cartItemText, styles.cartItemColumn]}>
              {item.quantity}
            </Text>
            <Text style={[styles.cartItemText, styles.cartItemColumn]}>
              ₹{item.quantity * item.price}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    color: '#333',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#555',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  cartItemColumn: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cartItemHeader: {
    backgroundColor: '#f1f1f1',
    fontWeight: 600,
  },
});

export default Final;
