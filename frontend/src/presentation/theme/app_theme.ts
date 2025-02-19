import {StyleSheet,Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const colors = {
  red: '#e30027',
  orange: '#eb750a',
  dark_red: '#4A0000',

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

  container: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    opacity: 1, // Adjust this value to control pattern visibility
  },
});
