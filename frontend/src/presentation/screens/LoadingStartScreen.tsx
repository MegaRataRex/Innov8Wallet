import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, styles} from '../theme/app_theme';
import Svg, {Defs, Pattern, Image, Rect} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export const LoadingStartScreen = () => {
  return (
    <View>
      <LinearGradient
        colors={[colors.dark_red, colors.red, colors.orange]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};
