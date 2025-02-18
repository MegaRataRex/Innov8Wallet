import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, styles} from '../theme/app_theme';
import Svg, {Defs, Pattern, Image, Rect, G} from 'react-native-svg';
import LinesSVG from '../../assets/svgs/CrissCrossLines';

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
      <Pattern
        id="LinesPattern"
        patternUnits="userSpaceOnUse"
        width="100"
        height="100">
        <G transform="scale(0.2)">
          <LinesSVG />
        </G>
      </Pattern>
      <Rect width="100%" height="100%" fill="url(#LinesPattern)" />
    </View>
  );
};
