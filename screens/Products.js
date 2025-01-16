import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import FilterModal from '../components/FilterModal';
import Headline from '../components/Headline';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Constants from 'expo-constants';

const Products = ({ navigation }) => {
  const apiUrl = `${Constants.expoConfig.extra.API_URL}`;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products);
      setSuggestions([]);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(text.toLowerCase()) ||
          product.description.toLowerCase().includes(text.toLowerCase())
      );
      const suggestionList = products
        .map((product) => product.title)
        .filter((title) => title.toLowerCase().includes(text.toLowerCase()));
      setFilteredProducts(filtered);
      setSuggestions([...new Set(suggestionList)]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(suggestion.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSuggestions([]);
  };

  const handleNavigateToDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <Headline />
      <TextInput
        style={styles.input}
        placeholder="Search Products..."
        value={query}
        onChangeText={handleSearch}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectSuggestion(suggestion)}
              style={styles.suggestionItem}>
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProductCard
              key={item.id}
              onAddToCart={handleAddToCart}
              product={item}
              title={item.title}
              images={item.images}
              price={`${item.price}`}
              onCardPress={() => handleNavigateToDetail(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No products found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filteredProducts.length === 0 ? styles.emptyContainer : null
        }
      />

      <TouchableOpacity
        style={styles.filterIcon}
        onPress={() => setModalVisible(true)}>
        <Icon name="filter-list" size={24} style={styles.iconStyle} />
      </TouchableOpacity>

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSortAtoZ={() => {
          setFilteredProducts(
            [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
          );
          setModalVisible(false);
        }}
        onSortZtoA={() => {
          setFilteredProducts(
            [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title))
          );
          setModalVisible(false);
        }}
        onSortPriceAsc={() => {
          setFilteredProducts(
            [...filteredProducts].sort((a, b) => a.price - b.price)
          );
          setModalVisible(false);
        }}
        onSortPriceDesc={() => {
          setFilteredProducts(
            [...filteredProducts].sort((a, b) => b.price - a.price)
          );
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#ffffff' },
  cardContainer: {
    flex: 1,
    margin: 5,
    zIndex: 0,
  },
  input: {
    borderColor: '#000',
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconStyle: {
    color: '#fff',
  },
  filterIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 10,
    zIndex: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});

export default Products;
