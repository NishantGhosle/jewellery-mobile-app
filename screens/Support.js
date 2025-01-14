import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AboutUs from './AboutUs';
import Contact from './Contact';

const Account = ({ navigation }) => {
  const [isContact, setIsContact] = useState(true);

  const ToggleSection = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, isContact && styles.activeButton]}
        onPress={() => setIsContact(true)}>
        <Text style={[styles.toggleText, isContact && styles.activeText]}>
          Contact
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, !isContact && styles.activeButton]}
        onPress={() => setIsContact(false)}>
        <Text style={[styles.toggleText, !isContact && styles.activeText]}>
          About Us
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ToggleSection />
      {isContact ? (
        <Contact
          navigation={navigation}
          switchToAboutUs={() => setIsContact(false)}
        />
      ) : (
        <AboutUs navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  activeButton: {
    borderBottomColor: '#000',
  },
  toggleText: {
    fontSize: 16,
    color: '#000',
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Account;
