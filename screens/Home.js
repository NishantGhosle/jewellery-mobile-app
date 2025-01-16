import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import axios from 'axios';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import Headline from '../components/Headline';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import {API_URL} from "@env"

const Home = ({ navigation }) => {
  const BASE_URL = API_URL;

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  
  // const shuffleArray = (array) => {
  //   return array.sort(() => Math.random() - 0.5);
  // };

  const handleNavigateToDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text>{error}</Text>
      </View>
    );
  }

  const topProducts = shuffleArray([...products]);
  const featuredProducts = shuffleArray([...products]);

  return (
    <ScrollView style={styles.container}>
      <Headline />
      <Carousel />
      <Text style={styles.sectionTitle}>Top Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topProducts.map((product, index) => (
          <ProductCard
             key={product.id || index}
            title={product.title}
            images={product.images}
            price={product.price}
            onCardPress={() => handleNavigateToDetail(product)}
            onAddToCart={() => handleAddToCart(product)}
            product={product}
          />
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredProducts.map((product, index) => (
          <ProductCard
             key={product.id || index}
            title={product.title}
            images={product.images}
            price={product.price}
            onCardPress={() => handleNavigateToDetail(product)}
            onAddToCart={() => handleAddToCart(product)}
            product={product}
          />
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>All Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product, index) => (
          <ProductCard
          key={product.id || index}
            title={product.title}
            images={product.images}
            price={product.price}
            onCardPress={() => handleNavigateToDetail(product)}
            onAddToCart={() => handleAddToCart(product)}
            product={product}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: 'white' },
  sectionTitle: { fontSize: 22, fontWeight: 600, marginVertical: 10 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Home;
