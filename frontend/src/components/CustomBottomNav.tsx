import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface CustomBottomNavProps {
  onPress: (screenName: string) => void;
}

export const CustomBottomNav: React.FC<CustomBottomNavProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onPress('Home')}
      >
        <Image
          source={require('../assets/icons/home.png')}
          style={[styles.icon, styles.activeIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onPress('Calendar')}
      >
        <Image
          source={require('../assets/icons/calendar.png')} 
          style={styles.icon} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => onPress('Action')}
      >
        <View style={styles.centerButtonInner} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onPress('Stats')}
      >
        <Image
          source={require('../assets/icons/stats.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onPress('SMS')}
      >
        <Image
          source={require('../assets/icons/sms.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  activeIcon: {
    tintColor: '#EA0A2A',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EA0A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20, // Lift it up slightly
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EA0A2A',
  },
});
