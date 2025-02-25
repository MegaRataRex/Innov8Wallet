
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from 'react';
import { Navigation } from './presentation/navigation/Navigation';
import HomePage from "presentation/screens/HomePage"
import CardsPage from "presentation/screens/CardsPage"
import LoginPage from "presentation/screens/LoginPage"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Navigation/>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Cards" component={CardsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}