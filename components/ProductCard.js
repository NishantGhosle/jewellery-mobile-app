import { TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window'); // Get the screen width

const ProductCard = ({
  title,
  images,
  price,
  onCardPress,
  onAddToCart,
  product,
}) => {
  const handleAddToCart = () => {
    onAddToCart(product);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `${title} has been added to the cart!`,
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      onPress: () => {
        console.log(`${title} clicked in Toast!`);
      },
    });
  };

  return (
    <TouchableOpacity onPress={onCardPress} style={styles.card}>
      {images && images.length > 0 ? (
        <Image
          source={{ uri: images[0] }}
          style={styles.image}
          resizeMode="contain" // Ensures the full image is visible
        />
      ) : (
        <Text style={styles.placeholderText}>No Image Available</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₹{price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width / 2) - 20, // Half the screen width minus padding
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignSelf: 'center',
  },
  image: {
    width: '100%', // Full width of the card
    height: 120, // Fixed height for consistent display
    marginBottom: 10,
    borderWidth: 0.5,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});


export default ProductCard;

