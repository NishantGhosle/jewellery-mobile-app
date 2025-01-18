import React, { useCallback, useMemo, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ProductDetail = memo(({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(product));
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `${product.title} has been added to the cart!`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  }, [dispatch, product]);

  const renderedDetails = useMemo(() => (
    <View style={styles.details}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ₹{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  ), [product]);

  return (
    <View style={styles.container}>
      <ImageCarousel images={product.images || []} />
      {renderedDetails}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const ImageCarousel = memo(({ images }) => (
  <FlatList
    data={images}
    horizontal
    pagingEnabled
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <Image source={{ uri: item }} style={styles.image} />
    )}
    showsHorizontalScrollIndicator={false}
    ListEmptyComponent={
      <View style={styles.noImage}>
        <Text>No images available</Text>
      </View>
    }
    style={styles.carousel}
  />
));

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  carousel: { marginBottom: 10 },
  image: { 
    width: width, // Full screen width
    height: width * 0.75, // Maintain a 4:3 aspect ratio (adjust as needed)
    resizeMode: 'contain', // Ensures the entire image fits within the space
  },
  noImage: {
    width: width, // Full screen width
    height: width * 0.75, // Same aspect ratio for empty state
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Placeholder background color
  },
  details: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  price: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  description: { fontSize: 15 },
  buttonContainer: {
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetail;
