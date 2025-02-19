import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {colors, styles} from '../theme/app_theme';
import LinesSVG from '../../assets/svgs/ZigZagPattern';

const GRADIENT_START = {x: 0, y: 0};
const GRADIENT_END = {x: 1, y: 1};

export const LoadingStartScreen = () => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(withTiming(1, {duration: 2000}), -1, true);
  }, []);

  // Animate locations dynamically
  const animatedLocations = useDerivedValue(() => {
    return [
      0,
      0.3 + animatedValue.value * 0.2,
      0.6 + animatedValue.value * 0.2,
      1,
    ];
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.dark_red, colors.red, colors.orange]}
        locations={animatedLocations.value} // ✅ Pass animated locations
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={StyleSheet.absoluteFillObject}
      />
      {[...Array(10)].map((_, index) => (
        <LinesSVG
          key={index}
          style={[StyleSheet.absoluteFillObject, {top: `${index * 10}%`}]}
        />
      ))}
      {[...Array(10)].map((_, index) =>
        index === 0 ? null : (
          <LinesSVG
            key={index}
            style={[StyleSheet.absoluteFillObject, {top: `${index * -10}%`}]}
          />
        ),
      )}
    </View>
  );
};
