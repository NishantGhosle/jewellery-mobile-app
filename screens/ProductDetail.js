import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `${product.title} has been added to the cart!`,
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      onPress: () => {
        console.log(`₹${product.title} clicked in Toast!`);
      },
    });
  };

  const imagess = product.images || [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}>
          {imagess.length > 0 ? (
            imagess.map((images, index) => (
              <Image key={index} source={{ uri: images }} style={styles.image} />
            ))
          ) : (
            <View style={styles.noImage}>
              <Text>No images available</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: ₹{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, marginBottom: 10, backgroundColor: '#fff' },
  carousel: { height: 450, marginBottom: 1 },
  image: { width: width, height: 450, resizeMode: 'contain' },
  noImage: {
    width: width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  title: { fontSize: 20, fontWeight: 600, marginBottom: 10 },
  price: { fontSize: 14, fontWeight: 600, marginBottom: 15 },
  description: { fontSize: 15 },
  addToCartButton: {
    backgroundColor: '#000000',
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductDetail;
