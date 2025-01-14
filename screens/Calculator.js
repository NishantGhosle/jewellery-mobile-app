import { View, StyleSheet } from 'react-native';
import GoldPriceCalculator from './GoldPriceCalculator';
import Headline from '../components/Headline';

const Calculator = () => {
  return (
    <View style={styles.container}>
      <Headline />
      <View style={styles.calculatorContainer}>
        <GoldPriceCalculator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  calculatorContainer: {
    flex: 1,
  },
});

export default Calculator;
