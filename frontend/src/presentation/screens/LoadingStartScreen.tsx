import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, styles} from '../theme/app_theme';
import LinesSVG from '../../assets/svgs/ZigZagPattern';

const GRADIENT_COLORS = [colors.dark_red, colors.red, colors.orange];
const GRADIENT_LOCATIONS = [0, 0.3, 0.6, 1, 1];
const GRADIENT_START = {x: 0, y: 0};
const GRADIENT_END = {x: 1, y: 1};
const MOVEMENT = GRADIENT_LOCATIONS[1] / 30;

export const LoadingStartScreen = () => {
  const [gradientOptions, setGradientOptions] = useState({
    colors: GRADIENT_COLORS,
    locations: GRADIENT_LOCATIONS,
    start: GRADIENT_START,
    end: GRADIENT_END,
  });

  const gradientOptionsRef = useRef(gradientOptions);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    gradientOptionsRef.current = gradientOptions;
  }, [gradientOptions]);

  useEffect(() => {
    const animateGradient = () => {
      if (gradientOptionsRef.current.locations[1] - MOVEMENT <= 0) {
        let gradientColors = [...gradientOptionsRef.current.colors];
        gradientColors.shift();
        gradientColors.push(gradientColors[1]);

        setGradientOptions({
          colors: gradientColors,
          locations: GRADIENT_LOCATIONS,
          start: GRADIENT_START,
          end: GRADIENT_END,
        });
      } else {
        let updatedLocations = gradientOptionsRef.current.locations.map(
          (item, index) =>
            index === gradientOptionsRef.current.locations.length - 1
              ? 1
              : Math.max(0, item - MOVEMENT),
        );

        setGradientOptions({
          colors: [...gradientOptionsRef.current.colors],
          locations: updatedLocations,
          start: GRADIENT_START,
          end: GRADIENT_END,
        });
      }

      animationFrameRef.current = requestAnimationFrame(animateGradient);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateGradient);

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

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
