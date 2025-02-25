import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import  CardsPage  from '../screens/CardsPage';

export type RootStackParams={
    Home: undefined
    Cards: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cards" component={CardsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
