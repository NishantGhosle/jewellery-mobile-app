import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const validPrice = item.price || 0;
      const validQuantity = item.quantity || 0;
      return total + validPrice * validQuantity;
    }, 0);
  };

  const discount = 1500;
  const grandTotal = calculateSubtotal() - discount;

  const handleCheckout = () => {
    navigation.navigate('Final', {
      cartItems,
      subtotal: calculateSubtotal(),
      discount,
      grandTotal,
    });
  };

  const renderItem = ({ item }) => (
    <View key={item._id} style={[styles.cartItem, { width: width - 32 }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() =>
              dispatch(
                updateQuantity({
                  _id: item._id,
                  quantity: Math.max(1, item.quantity - 1),
                })
              )
            }>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() =>
              dispatch(
                updateQuantity({ _id: item._id, quantity: item.quantity + 1 })
              )
            }>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removeFromCart(item._id))}>
        <Text style={styles.removeText}>REMOVE</Text>
      </TouchableOpacity>
    </View>
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
        <TouchableOpacity
          style={styles.shopNowButton}
          onPress={() => navigation.navigate('Products')}>
          <Text style={styles.shopNowButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <Text style={styles.summaryText}>
            Items in Cart: {cartItems.length}
          </Text>
          <Text style={styles.summaryText}>
            Subtotal: ₹{calculateSubtotal()}
          </Text>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal</Text>
            <Text style={styles.paymentValue}>₹{calculateSubtotal()}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Discount</Text>
            <Text style={styles.paymentValue}>₹{discount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.paymentRow}>
            <Text style={styles.grandTotalLabel}>Grand Total</Text>
            <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
          </View>
        </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  emptyCartText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000000',
  },
  shopNowButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  shopNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
  },
  orderSummary: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 1,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    marginBottom: 4,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  itemImage: {
    width: 110,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 600,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  price: {
    fontWeight: 600,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 8,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  removeText: {
    color: '#E74C3C',
    fontWeight: 600,
  },
  paymentDetails: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 40,
    elevation: 2,
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
  checkoutButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cart;
