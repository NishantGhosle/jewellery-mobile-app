import { ScrollView, Image, StyleSheet } from 'react-native';

const Carousel = () => {
  const images = [
    'https://jewellery-images.netlify.app/gold/nosepin2.jpg',
    'https://jewellery-images.netlify.app/gold/pendant2.jpg',
    'https://jewellery-images.netlify.app/gold/ring2.jpg',
    'https://jewellery-images.netlify.app/gold/necklace2.jpg',
    'https://jewellery-images.netlify.app/gold/mangalsutra2.jpg',
    'https://jewellery-images.netlify.app/gold/earring2.jpg',
    'https://jewellery-images.netlify.app/gold/chaiin2.jpg',
    'https://jewellery-images.netlify.app/gold/bracelet2.jpg',
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.carousel}>
      {images.map((img, index) => (
        <Image key={index} source={{ uri: img }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carousel: { marginVertical: 10, flexDirection: 'row' },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
});

export default Carousel;
