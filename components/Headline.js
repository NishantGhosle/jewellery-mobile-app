import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const Headline = () => {
  const screenWidth = Dimensions.get('window').width;
  const animatedValue = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: screenWidth,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue, screenWidth]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.headline,
          { transform: [{ translateX: animatedValue }] },
        ]}
        numberOfLines={1}
        ellipsizeMode="clip">
        <Text> Live Gold Price ₹79,640 </Text>
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Headline;
