import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, styles} from '../theme/app_theme';
import LinesSVG from '../../assets/svgs/ZigZagPattern';

const GRADIENT_COLORS = [colors.dark_red, colors.red , colors.red, colors.orange];
const GRADIENT_LOCATIONS = [0,0.3,0.6,1,1];
const GRADIENT_START = {x: 0, y: 0};
const GRADIENT_END = {x: 1, y: 1};
let timeout = undefined
export const LoadingStartScreen = () => {

  let[gradientOptions, setGradientOptions] = React.useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: GRADIENT_START,
    end: GRADIENT_END,
  });

  const gradientOptionsRef = React.useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  let reset = () => {
    //Stop Animations
    if(timeout != undefined){
      clearTimeout(timeout);
      timeout = undefined;
    }
    setGradientOptions({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: GRADIENT_START,
    end: GRADIENT_END,
    });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientOptions.colors}
        locations={gradientOptions.locations}
        start={gradientOptions.start}
        end={gradientOptions.end}
        style={[StyleSheet.absoluteFillObject, styles.gradient]}
      />

{[...Array(10)].map((_, index) => (
    <LinesSVG
      key={index}
      style={[
        StyleSheet.absoluteFillObject,
        { top: `${index * 10}%` }, // Adjust 50% to control overlap
      ]}
    />
  ))}

{[...Array(10)].map((_, index) => (
  index === 0 ? null : ( // Skip the first element
    <LinesSVG
      key={index}
      style={[
        StyleSheet.absoluteFillObject,
        { top: `${(index) * -10}%` }, // Adjust positioning
      ]}
    />
  )
))}

    </View>
  );
};
