import React from 'react';
import { View } from 'react-native';
import { styles } from '../theme/app_themes';
import { Text } from 'react-native-gesture-handler';

export const HomeScreen = () => {
  return (
    <View style={[styles.background]}>
      <Text>Homescreen</Text>
    </View>
  );
};
