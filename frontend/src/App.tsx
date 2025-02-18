/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import { LoadingScreen } from './presentation/screens/LoadingScreen';
import {styles} from './presentation/theme/app_theme';

export default function App() {
  return (
    <View style={styles.background}>
      <LoadingScreen/>
    </View>
  );
}


