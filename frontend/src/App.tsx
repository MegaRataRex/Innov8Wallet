/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {styles} from './presentation/theme/app_theme';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
