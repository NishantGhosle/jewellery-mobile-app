import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 JewelryApp. All Rights Reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { padding: 10, backgroundColor: '#000', alignItems: 'center' },
  text: { color: '#fff', fontSize: 12 },
});

export default Footer;
