import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Headline from '../components/Headline';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Constants from 'expo-constants';
import Banner from '../components/Banner';

const Home = ({ navigation }) => {
  const apiUrl = `${Constants.expoConfig.extra.API_URL}`;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
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
  const popularProducts = shuffleArray([...products]);

  const renderHorizontalList = (title, data) => (
    <View style={styles.newCont}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            images={item.images}
            price={item.price}
            onCardPress={() => handleNavigateToDetail(item)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
      />
    </View>
  );

  const renderListHeader = () => (
    <View style={styles.container}>
      <Headline />
      <Banner
        image={require('../assets/banner1.png')}
        title="Exclusive Jewellery Collection"
        description="Discover the latest trends in gold jewellery.!"
      />
      {renderHorizontalList('Top Products', topProducts)}
      <Banner
        image={require('../assets/banner3.png')}
        title="Exclusive Jewellery Collection"
        description="Discover the latest trends in gold jewellery.!"
      />
      {renderHorizontalList('Popular Products', popularProducts)}
      <Banner
        image={require('../assets/banner2.png')}
        title="Exclusive Jewellery Collection"
        description="Discover the latest trends in gold jewellery.!"
      />
      {renderHorizontalList('Featured Products', featuredProducts)}
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => item.id || index.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderListHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: 'white' },
  newCont:{
    marginBottom:30,
  },
  sectionTitle: { fontSize: 22, fontWeight: '600', marginVertical: 10 },
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
