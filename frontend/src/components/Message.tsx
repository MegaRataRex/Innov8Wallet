import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const Message: React.FC<MessageProps> = ({text, isUser, timestamp}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.botMessage,
      ]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E31837', // Banorte red color
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#F5F5F5',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
});