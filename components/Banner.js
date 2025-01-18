import React from 'react';
import { View,  StyleSheet, ImageBackground } from 'react-native';

const Banner = ({ image }) => {
  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 10,
    overflow: 'hidden',
  },
  imageBackground: {
  
    marginBottom:10,
    height: 200,
    justifyContent: 'center',
  },
  image: {
    // borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Banner;
