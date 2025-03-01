import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface CustomBottomNavProps {
  onPress: (screenName: string) => void;
}

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  // Add other screen names and their params here
};

export const CustomBottomNav: React.FC<CustomBottomNavProps> = ({ onPress }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };

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
      {/* Middle button */}
      <TouchableOpacity
        onPress={handleChatPress}
        style={styles.middleButton}
      >
        <Image source={require('../assets/icons/chat-icon.png')} style={styles.icon} />
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
  activeIcon: {
    tintColor: '#EA0A2A',
  },
  middleButton: {
    backgroundColor: '#E31837', // Banorte red color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#E31837', // Banorte red color
  },
  centerButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EA0A2A',
  },
});
