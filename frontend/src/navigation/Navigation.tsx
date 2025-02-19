import {createStackNavigator} from '@react-navigation/stack';
import {LoadingStartScreen} from '../presentation/screens/LoadingStartScreen';

const Stack = createStackNavigator();

export function Navigation() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      }}>
      <Stack.Screen name="LoadingStart" component={LoadingStartScreen} />
    </Stack.Navigator>
  );
}
