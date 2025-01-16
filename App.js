import { useState, useEffect } from 'react';
import { View, StyleSheet,
   Image
   } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import store from './store/store';
import Toast from 'react-native-toast-message';

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image source={require('./assets/splash-icon.png')} style={styles.logo} />
    </View>
  );
};

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </View>
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 350,
    height: 350,
    borderRadius: 300,
    resizeMode: 'cover',
  },
});

export default App;
