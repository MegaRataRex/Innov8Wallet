import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/app_theme';

export const LoadingScreen = () => {
  return (
    <LinearGradient
    colors={[colors.red, colors.orange]}
    start={{x: 0, y:0}}
    end={{x: 1, y: 1}}
    >
    <View>
        LoadingScreen

    </View>
    </LinearGradient>
    );
};
