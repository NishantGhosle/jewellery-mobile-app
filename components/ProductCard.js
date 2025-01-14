import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Toast from 'react-native-toast-message';

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
          resizeMode="cover"
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
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
    overflow: 'hidden',
    width: 400,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 400,
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
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductCard;
