import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContainerProps } from 'react-native-screens';
import { styles } from '../presentation/theme/app_themes';

export const Container = ({ children, style}: ScreenContainerProps) => {
  return (
    <View>
        <SafeAreaView style={[styles.container, style]}>
        {children}
        </SafeAreaView>
    </View>
  );
};
