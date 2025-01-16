import { Text, Image, StyleSheet, FlatList } from 'react-native';

const AboutUs = () => {
  const content = [
    {
      type: 'image',
      source: 'https://jewellery-images.netlify.app/client/client.jpeg',
    },
    {
      type: 'text',
      content: `Welcome to Rohit Jewellers! We are passionate about bringing you the best products and services tailored to meet your needs. Our journey began with the vision of creating a seamless experience for our customers and building lasting relationships based on trust and quality.`,
    },
    { type: 'subheading', content: 'Our Mission' },
    {
      type: 'text',
      content: `Our mission is to deliver exceptional value and innovation while keeping our customers at the heart of everything we do. Whether it’s crafting unique jewelry, providing top-tier customer service, or ensuring hassle-free shopping, we strive for excellence every step of the way.`,
    },
    { type: 'subheading', content: 'Why Choose Us?' },
    {
      type: 'bullet',
      items: [
        'Quality Products: We offer a wide range of meticulously crafted items to meet your desires and exceed your expectations.',
        'Customer Focused: Your satisfaction is our priority. We ensure prompt support and a smooth shopping experience.',
        'Secure Payments: Enjoy peace of mind with our reliable and secure payment options.',
      ],
    },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'image':
        return (
          <Image
            source={{ uri: item.source }}
            style={styles.image}
            accessibilityLabel="Jewelry showcase image"
          />
        );
      case 'subheading':
        return <Text style={styles.subheading}>{item.content}</Text>;
      case 'text':
        return <Text style={styles.paragraph}>{item.content}</Text>;
      case 'bullet':
        return item.items.map((bullet, index) => (
          <Text key={index} style={styles.paragraph}>
            • {bullet}
          </Text>
        ));
      default:
        return null;
    }
  };

  return <FlatList data={content} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    padding:10
  },
  paragraph: {
    fontSize: 15,
    color: '#000',
    lineHeight: 24,
    textAlign: 'justify',
    padding:10
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default AboutUs;

