import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetail from '../screens/ProductDetail';
import Products from '../screens/Products';
import Final from '../screens/Final';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}  
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Final" component={Final} />
    </Stack.Navigator>
  );      
};
export default StackNavigator;
