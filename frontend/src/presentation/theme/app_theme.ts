import {StyleSheet} from 'react-native';
import {FeSpotLight} from 'react-native-svg';

export const colors = {
  red: '#e30027',
  orange: '#eb750a',
  dark_red: '#4a0712',

  primaryText: '#000000',
  background: '#FFFFFF',
};

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },

  backgroundLoading: {
    flex: 1,
  },
});
