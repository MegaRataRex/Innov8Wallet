import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface ActionButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Image source={icon} style={styles.actionIcon} />
    </TouchableOpacity>
  );
};

interface ActionButtonsProps {
  buttons: {
    icon: ImageSourcePropType;
    onPress: () => void;
  }[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons }) => {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <ActionButton
          key={index}
          icon={button.icon}
          onPress={button.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    backgroundColor: '#E31837', // Banorte red color
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default ActionButtons;