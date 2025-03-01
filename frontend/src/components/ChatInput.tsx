import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pregunta tus dudas"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity onPress={handleSend} style={styles.button}>
        <Image source={require('../assets/icons/send-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/icons/mic-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
  },
  button: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#E31837', // Banorte red color
  },
});