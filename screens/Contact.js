import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {API_URL} from "@env"

const Contact = () => {

  const BASE_URL = API_URL;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async () => {
    let valid = true;
    const errors = { name: '', email: '', message: '' };

    if (!name) {
      errors.name = 'Name is required!';
      valid = false;
    }

    if (!email) {
      errors.email = 'Email is required!';
      valid = false;
    }

    if (!message) {
      errors.message = 'Message is required!';
      valid = false;
    }

    setError(errors);

    if (!valid) return;

    try {
      const response = await fetch(
        `${BASE_URL}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (response.ok) {
        setError({ name: '', email: '', message: '' });
        setName('');
        setEmail('');
        setMessage('');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `Message sent!`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
          onPress: () => {
            console.log(`${title} clicked in Toast!`);
          },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Error!`,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
          onPress: () => {
            console.log(` clicked in Toast!`);
          },
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Something went wrong!`,
        position: 'bottom ',
        visibilityTime: 2000,
        autoHide: true,
        onPress: () => {
          console.log(` clicked in Toast!`);
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.description}>
        Have questions or feedback? Fill out the form below, and we’ll get back
        to you as soon as possible!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={[styles.input, error.name ? styles.inputError : null]}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        {error.name ? <Text style={styles.errorText}>{error.name}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={[styles.input, error.email ? styles.inputError : null]}
          placeholder="Enter your email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null} 
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Message*</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            error.message ? styles.inputError : null,
          ]}
          placeholder="Type your message here"
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
        {error.message ? (
          <Text style={styles.errorText}>{error.message}</Text>
        ) : null} 
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#000000',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Contact;
