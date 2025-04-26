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
        <Image source={require('../assets/icons/chat-icon.png')} style={styles.iconCenter} />
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
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconCenter: {
    width: 40,
    height: 40,
  },
  centerButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
