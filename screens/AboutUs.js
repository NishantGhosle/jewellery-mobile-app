import { Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Image
        source={{
          uri: 'https://jewellery-images.netlify.app/client/client.jpeg',
        }}
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Welcome to Rohit Jewellers! We are passionate about bringing you the
        best products and services tailored to meet your needs. Our journey
        began with the vision of creating a seamless experience for our
        customers and building lasting relationships based on trust and quality.
      </Text>

      <Text style={styles.subheading}>Our Mission</Text>
      <Text style={styles.paragraph}>
        Our mission is to deliver exceptional value and innovation while keeping
        our customers at the heart of everything we do. Whether it’s crafting
        unique jewelry, providing top-tier customer service, or ensuring
        hassle-free shopping, we strive for excellence every step of the way.
      </Text>

      <Text style={styles.subheading}>Why Choose Us?</Text>
      <Text style={styles.paragraph}>
        - Quality Products: We offer a wide range of meticulously crafted items
        to meet your desires and exceed your expectations.{'\n'}- Customer
        Focused: Your satisfaction is our priority. We ensure prompt support and
        a smooth shopping experience. {'\n'}- Secure Payments: Enjoy peace of
        mind with our reliable and secure payment options.{'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 600,
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    color: '#000',
    lineHeight: 24,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default AboutUs;
